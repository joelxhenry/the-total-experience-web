import { Resend } from 'resend'

let _client: Resend | null = null
let _checked = false

function getClient(): Resend | null {
  if (_checked) return _client
  _checked = true

  const cfg = useRuntimeConfig()
  if (!cfg.resendApiKey) return null

  _client = new Resend(cfg.resendApiKey)
  return _client
}

export interface InviteEmailParams {
  to: string
  customerName?: string | null
  reviewUrl: string
}

export async function sendInviteEmail(params: InviteEmailParams): Promise<void> {
  const cfg = useRuntimeConfig()
  const greeting = params.customerName ? `Hi ${params.customerName},` : 'Hello,'

  const text = [
    greeting,
    '',
    'Thank you for training with The Total Experience. We would love to hear about your experience.',
    '',
    'Please use the secure link below to leave a review. It will expire in 14 days and can only be used once:',
    params.reviewUrl,
    '',
    '— The Total Experience'
  ].join('\n')

  const html = `
    <p>${greeting}</p>
    <p>Thank you for training with The Total Experience. We would love to hear about your experience.</p>
    <p>Please use the secure link below to leave a review. It will expire in 14 days and can only be used once:</p>
    <p><a href="${params.reviewUrl}">${params.reviewUrl}</a></p>
    <p>— The Total Experience</p>
  `

  const subject = 'Share your experience with The Total Experience'
  const from = cfg.mailFrom || 'The Total Experience <onboarding@resend.dev>'

  const client = getClient()
  if (!client) {
    console.log('[mail:console-fallback] RESEND_API_KEY not configured — would send invite email:')
    console.log(`  From: ${from}`)
    console.log(`  To:   ${params.to}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  Link: ${params.reviewUrl}`)
    return
  }

  const { error } = await client.emails.send({
    from,
    to: params.to,
    subject,
    text,
    html
  })

  if (error) {
    throw createError({
      statusCode: 502,
      statusMessage: `Resend send failed: ${error.message || 'unknown error'}`
    })
  }
}
