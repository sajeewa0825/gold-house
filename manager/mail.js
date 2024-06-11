const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, token) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.NM_AUTH_USER,
      pass: process.env.EMAIL_SEND_API_KEY,
    },
  });

  if (subject === "Register") {
    subject = "Gold House Email Verification";
    text = `
    <html>
    <head>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; text-align: center;">
    <h1>Email Verification</h1>
    <p>Thank you for registering. Please click the button below to verify your email address.</p>
    <a href="${token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Verify Email</a>
    <p>If the button above does not work, please click the link below or copy and paste it into your browser:</p>
    <a href="${token}">${token}</a>
  </div>
  </body>
  </html>
  `;
  } else if (subject === "Resetpw") {
    subject = "Gold House Password Reset";
    text = `
    <html>
    <head>
    </head>
    <body>
    <div style="font-family: Arial, sans-serif; text-align: center;">
    <h1>Password Reset</h1>
    <p>Click the button below to reset your password.</p>
    <a href="${token}" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #28a745; border-radius: 5px; text-decoration: none;">Reset Password</a>
    <p>If the button above does not work, please click the link below or copy and paste it into your browser:</p>
    <a href="${token}">${token}</a>
  </div>
  </body>
  </html>
  `;
  }

  await transporter
    .sendMail({
      to: to,
      from: process.env.NM_AUTH_USER,
      text: text,
      subject: subject,
    })
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = sendMail;
