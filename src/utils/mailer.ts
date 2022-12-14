import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  token,
  url,
}: {
  email: string;
  token: string;
  url: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Michael S" <mscott@dmpaper.com>',
    to: email,
    subject: "Login to your account",
    html: `Login by clicking <a href="${url}/login#token=${token}">here</a>`,
  });

  console.info("Preview URL: ", nodemailer.getTestMessageUrl(info));
}
