'use server'
const nodemailer = require('nodemailer');

export const sendMail = async (to: string, key: string | number) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

  try {
    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      replyTo: to,
      subject: `Authorization code`,
      html: `
      <p>Code: ${key} </p>
      `,
  })

  return 'success'

} catch (error) {
  console.log(error)
  return 'failed'
}

}