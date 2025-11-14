import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendTeamInviteEmail(
  email: string,
  inviteToken: string,
  teamId: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email')
    return
  }

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${inviteToken}`

  try {
    await resend.emails.send({
      from: 'Mockavio <noreply@mockavio.com>',
      to: email,
      subject: 'You\'ve been invited to join a Mockavio team',
      html: `
        <h2>You've been invited to join a Mockavio team</h2>
        <p>Click the link below to accept the invitation:</p>
        <a href="${inviteLink}">${inviteLink}</a>
        <p>This link will expire in 7 days.</p>
      `,
    })
  } catch (error) {
    console.error('Failed to send invitation email:', error)
    throw error
  }
}

export async function sendGalleryShareEmail(
  email: string,
  galleryTitle: string,
  shareUrl: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email')
    return
  }

  try {
    await resend.emails.send({
      from: 'Mockavio <noreply@mockavio.com>',
      to: email,
      subject: `View ${galleryTitle} on Mockavio`,
      html: `
        <h2>${galleryTitle}</h2>
        <p>View the gallery:</p>
        <a href="${shareUrl}">${shareUrl}</a>
      `,
    })
  } catch (error) {
    console.error('Failed to send gallery email:', error)
    throw error
  }
}

