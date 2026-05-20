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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInviteHtml(params: InviteEmailParams): string {
  const greeting = params.customerName
    ? `Hi ${escapeHtml(params.customerName)},`
    : 'Hello,'
  const url = escapeHtml(params.reviewUrl)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Share your experience</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background-color:#15803d;padding:20px 28px;">
                <p style="margin:0;font-size:14px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;">
                  The Total Educational Experience
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 8px 28px;">
                <h1 style="margin:0 0 16px 0;font-size:22px;line-height:1.3;font-weight:700;color:#0f172a;">
                  Share your experience
                </h1>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;">${greeting}</p>
                <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#334155;">
                  Thank you for training with The Total Experience. We would love to hear about your experience.
                </p>
                <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;color:#334155;">
                  Use the secure link below to leave a review. It expires in 14 days and can only be used once.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:0 28px 8px 28px;">
                <a href="${url}"
                   style="display:inline-block;background-color:#16a34a;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:14px 28px;border-radius:8px;">
                  Leave a review
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 32px 28px;">
                <p style="margin:0 0 6px 0;font-size:13px;line-height:1.5;color:#64748b;">
                  Or paste this link into your browser:
                </p>
                <p style="margin:0;font-size:13px;line-height:1.5;color:#475569;word-break:break-all;">
                  <a href="${url}" style="color:#15803d;text-decoration:underline;">${url}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 28px;">
                <p style="margin:0;font-size:12px;line-height:1.5;color:#64748b;">
                  You're receiving this email because you completed training with The Total Experience.
                  If you didn't expect this, you can safely ignore it.
                </p>
              </td>
            </tr>
          </table>
          <p style="margin:16px 0 0 0;font-size:12px;color:#94a3b8;">
            &copy; ${new Date().getFullYear()} The Total Experience
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
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

  const html = renderInviteHtml(params)

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
