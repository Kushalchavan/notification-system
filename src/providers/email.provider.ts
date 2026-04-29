import nodeMailer from "nodemailer";
import { serverConfig } from "../config/env.config";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: serverConfig.EMAIL_USER,
    pass: serverConfig.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const info = await transporter.sendMail({
    from: serverConfig.EMAIL_USER,
    to,
    subject,
    text,
  });

  return info;
};
