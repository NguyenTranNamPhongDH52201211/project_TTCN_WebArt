const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendEmail };
