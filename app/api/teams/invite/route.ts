import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendTeamInviteEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { teamId, email, role } = body

    if (!teamId || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: teamId, email, and role' },
        { status: 400 }
      )
    }

    // Get user from auth
    const userId = 'user-id-placeholder'

    // Generate invite token
    const inviteToken = crypto.randomUUID()

    const invite = await db.transact(async (tx) => {
      const invite = await tx.teamMember.create({
        teamId,
        userId: '', // Will be set when accepted
        email,
        role,
        status: 'pending',
        invitedAt: Date.now(),
        invitedBy: userId,
        createdAt: Date.now(),
      })

      // Send invitation email
      await sendTeamInviteEmail(email, inviteToken, teamId)

      return invite
    })

    return NextResponse.json({
      success: true,
      inviteToken,
      inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteToken}`,
    })
  } catch (error) {
    console.error('Team invite error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to send invitation',
      },
      { status: 500 }
    )
  }
}

