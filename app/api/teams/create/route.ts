import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, plan } = body

    if (!name || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields: name and plan' },
        { status: 400 }
      )
    }

    // Get user from auth (would need to implement auth check)
    // For now, using placeholder
    const userId = 'user-id-placeholder'

    // Set quotas based on plan
    const quotas: Record<string, number> = {
      starter: 500,
      professional: 2000,
      enterprise: 999999,
    }

    const team = await db.transact(async (tx) => {
      const team = await tx.team.create({
        name,
        ownerId: userId,
        plan,
        imageQuota: quotas[plan] || 500,
        imageUsed: 0,
        quotaResetDate: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })

      // Add owner as team member
      await tx.teamMember.create({
        teamId: team.id,
        userId,
        role: 'owner',
        status: 'active',
        joinedAt: Date.now(),
        lastActiveAt: Date.now(),
        createdAt: Date.now(),
      })

      return team
    })

    return NextResponse.json({
      success: true,
      teamId: team.id,
      team,
    })
  } catch (error) {
    console.error('Team creation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create team',
      },
      { status: 500 }
    )
  }
}

