import nodemailer from "nodemailer";
import configMail from "../config/configMail.js";

const { SERVICEMAIL, MAIL_USER, MAIL_PASSWORD } = configMail;

export const transport = nodemailer.createTransport({
  service: SERVICEMAIL,
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});
