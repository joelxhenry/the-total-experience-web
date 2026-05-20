import nodemailer, { type Transporter } from 'nodemailer'

let _transporter: Transporter | null = null
let _transporterChecked = false

function getTransporter(): Transporter | null {
  if (_transporterChecked) return _transporter
  _transporterChecked = true

  const cfg = useRuntimeConfig()
  if (!cfg.smtpHost || !cfg.smtpUser || !cfg.smtpPass) {
    return null
  }

  _transporter = nodemailer.createTransport({
    host: cfg.smtpHost,
    port: Number(cfg.smtpPort || 587),
    secure: String(cfg.smtpSecure).toLowerCase() === 'true',
    auth: {
      user: cfg.smtpUser,
      pass: cfg.smtpPass
    }
  })
  return _transporter
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
  const from = cfg.mailFrom || 'no-reply@thetotalexperience.local'

  const transporter = getTransporter()
  if (!transporter) {
    console.log('[mail:console-fallback] SMTP not configured — would send invite email:')
    console.log(`  From: ${from}`)
    console.log(`  To:   ${params.to}`)
    console.log(`  Subject: ${subject}`)
    console.log(`  Link: ${params.reviewUrl}`)
    return
  }

  await transporter.sendMail({ from, to: params.to, subject, text, html })
}
