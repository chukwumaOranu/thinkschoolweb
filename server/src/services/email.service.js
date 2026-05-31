const nodemailer = require('nodemailer')

const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const getBrand = () => ({
  appName: process.env.APP_NAME || 'ThinkSchool App',
  primaryColor: process.env.EMAIL_PRIMARY_COLOR || '#003399',
  accentColor: process.env.EMAIL_ACCENT_COLOR || '#FECE0A',
  websiteUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  supportEmail: process.env.CONTACT_NOTIFY_TO || process.env.SMTP_USER || 'info@thinkschoolapps.co.uk',
})

const isEmailEnabled = () => process.env.EMAIL_ENABLED !== 'false'

const hasSmtpConfig = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

const getTransporter = () =>
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

const emailShell = ({ preview, heading, intro, body }) => {
  const brand = getBrand()

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;background:#f6f6f7;font-family:Arial,Helvetica,sans-serif;color:#202124;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f6f7;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e8ec;">
            <tr>
              <td style="background:${brand.primaryColor};padding:28px 32px;">
                <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:1.3;">${escapeHtml(brand.appName)}</h1>
                <p style="margin:8px 0 0;color:#ffffffcc;font-size:14px;">${escapeHtml(intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 16px;color:#111111;font-size:22px;line-height:1.35;">${escapeHtml(heading)}</h2>
                ${body}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#fbfbfc;border-top:1px solid #ececf1;">
                <p style="margin:0;color:#5f6368;font-size:13px;line-height:1.6;">
                  ${escapeHtml(brand.appName)}<br />
                  <a href="${escapeHtml(brand.websiteUrl)}" style="color:${brand.primaryColor};text-decoration:none;">${escapeHtml(brand.websiteUrl)}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

const detailsTable = (submission) => {
  const rows = [
    ['Name', submission.name],
    ['Email', submission.email],
    ['Selected Plan', submission.plan || 'Not selected'],
    ['Subject', submission.subject],
    ['Message', submission.message],
  ]

  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:20px 0;border:1px solid #e8e8ec;border-radius:8px;overflow:hidden;">
      ${rows
        .map(
          ([label, value]) => `
            <tr>
              <td style="width:160px;padding:14px 16px;background:#f6f6f7;border-bottom:1px solid #e8e8ec;color:#4b5563;font-size:14px;font-weight:bold;vertical-align:top;">${escapeHtml(label)}</td>
              <td style="padding:14px 16px;border-bottom:1px solid #e8e8ec;color:#111827;font-size:14px;line-height:1.6;white-space:pre-line;">${escapeHtml(value)}</td>
            </tr>
          `,
        )
        .join('')}
    </table>
  `
}

const buildAdminNotification = (submission) =>
  emailShell({
    preview: `New ThinkSchool contact message from ${submission.name}`,
    heading: 'New Contact Form Submission',
    intro: 'A new enquiry has been submitted from the website.',
    body: `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        A visitor has submitted the ThinkSchool contact form. The details are below.
      </p>
      ${detailsTable(submission)}
      <p style="margin:18px 0 0;color:#374151;font-size:14px;line-height:1.7;">
        You can reply directly to this email to contact ${escapeHtml(submission.name)}.
      </p>
    `,
  })

const buildSenderConfirmation = (submission) => {
  const brand = getBrand()

  return emailShell({
    preview: `Thanks for contacting ${brand.appName}`,
    heading: 'We Received Your Message',
    intro: 'Thank you for reaching out to the ThinkSchool team.',
    body: `
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        Hello ${escapeHtml(submission.name)},
      </p>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        Thank you for contacting ${escapeHtml(brand.appName)}. We have received your enquiry and our team will review it shortly.
      </p>
      <div style="margin:24px 0;padding:18px 20px;background:#fff8d8;border-left:4px solid ${brand.accentColor};border-radius:8px;">
        <p style="margin:0;color:#111827;font-size:15px;line-height:1.7;">
          Your selected plan: <strong>${escapeHtml(submission.plan || 'Not selected')}</strong>
        </p>
      </div>
      <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.7;">
        For your records, here is a copy of your message:
      </p>
      ${detailsTable(submission)}
      <p style="margin:18px 0 0;color:#374151;font-size:14px;line-height:1.7;">
        If you need to add more information, you can contact us at
        <a href="mailto:${escapeHtml(brand.supportEmail)}" style="color:${brand.primaryColor};text-decoration:none;">${escapeHtml(brand.supportEmail)}</a>.
      </p>
    `,
  })
}

const sendContactEmails = async (submission) => {
  if (!isEmailEnabled()) return { skipped: true, reason: 'Email sending is disabled' }

  if (!hasSmtpConfig()) {
    console.warn('Contact emails skipped: SMTP_HOST, SMTP_USER, and SMTP_PASS are required.')
    return { skipped: true, reason: 'SMTP is not configured' }
  }

  const transporter = getTransporter()
  const from = process.env.SMTP_FROM || `${getBrand().appName} <${process.env.SMTP_USER}>`
  const notifyTo = process.env.CONTACT_NOTIFY_TO || process.env.SMTP_USER
  const adminSubjectPrefix = process.env.CONTACT_ADMIN_SUBJECT_PREFIX || 'New ThinkSchool Enquiry'
  const confirmationSubject = process.env.CONTACT_CONFIRMATION_SUBJECT || 'We received your ThinkSchool enquiry'

  await Promise.all([
    transporter.sendMail({
      from,
      to: notifyTo,
      replyTo: submission.email,
      subject: `${adminSubjectPrefix}: ${submission.subject}`,
      html: buildAdminNotification(submission),
      text: `New contact submission\n\nName: ${submission.name}\nEmail: ${submission.email}\nPlan: ${submission.plan || 'Not selected'}\nSubject: ${submission.subject}\n\n${submission.message}`,
    }),
    transporter.sendMail({
      from,
      to: submission.email,
      replyTo: notifyTo,
      subject: confirmationSubject,
      html: buildSenderConfirmation(submission),
      text: `Hello ${submission.name},\n\nThank you for contacting ${getBrand().appName}. We received your message and will review it shortly.\n\nSelected plan: ${submission.plan || 'Not selected'}\nSubject: ${submission.subject}\n\n${submission.message}`,
    }),
  ])

  return { sent: true }
}

module.exports = {
  sendContactEmails,
}
