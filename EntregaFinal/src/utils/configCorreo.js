import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: process.env.SERVICEMAIL,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
