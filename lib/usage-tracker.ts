import { db } from './db'

export interface UsageLimits {
  imageQuota: number
  imageUsed: number
  quotaResetDate: number
}

export async function getUsageLimits(
  userId: string,
  teamId?: string
): Promise<UsageLimits | null> {
  if (teamId) {
    const teams = await db.teams.query({ id: teamId })
    if (teams.length > 0) {
      const team = teams[0]
      return {
        imageQuota: team.imageQuota,
        imageUsed: team.imageUsed,
        quotaResetDate: team.quotaResetDate,
      }
    }
  }

  // Fallback to user-level usage
  const usage = await db.usage.query({ userId })
  if (usage.length > 0) {
    const userUsage = usage[0]
    const quotas: Record<string, number> = {
      starter: 500,
      professional: 2000,
      enterprise: 999999,
    }
    return {
      imageQuota: quotas[userUsage.tier] || 500,
      imageUsed: userUsage.count,
      quotaResetDate: userUsage.lastReset,
    }
  }

  return null
}

export async function checkUsageLimit(
  userId: string,
  teamId?: string
): Promise<{ allowed: boolean; remaining: number }> {
  const limits = await getUsageLimits(userId, teamId)

  if (!limits) {
    return { allowed: true, remaining: Infinity }
  }

  // Check if quota has reset
  if (Date.now() > limits.quotaResetDate) {
    // Reset usage
    if (teamId) {
      await db.teams.update(teamId, {
        imageUsed: 0,
        quotaResetDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
      })
    } else {
      await db.usage.update(userId, {
        count: 0,
        lastReset: Date.now() + 30 * 24 * 60 * 60 * 1000,
      })
    }
    return { allowed: true, remaining: limits.imageQuota }
  }

  const remaining = limits.imageQuota - limits.imageUsed
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
  }
}

export async function incrementUsage(
  userId: string,
  teamId?: string,
  count: number = 1
): Promise<void> {
  if (teamId) {
    const teams = await db.teams.query({ id: teamId })
    if (teams.length > 0) {
      const team = teams[0]
      await db.teams.update(teamId, {
        imageUsed: team.imageUsed + count,
      })
    }
  } else {
    const usage = await db.usage.query({ userId })
    if (usage.length > 0) {
      await db.usage.update(usage[0].id, {
        count: usage[0].count + count,
      })
    } else {
      await db.usage.create({
        userId,
        tier: 'starter',
        count,
        lastReset: Date.now(),
      })
    }
  }
}

