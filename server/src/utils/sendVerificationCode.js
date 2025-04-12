import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";
import { sendEmail } from "./sendEmail.js";

export async function sendVerificationCode(email, verificationCode, res) {
  try {
    const message = generateVerificationOtpEmailTemplate(verificationCode);
    sendEmail({
      email,
      subject: "Verification Code - Bookworm Library Management System",
      message,
    });
    return res.status(200).json({
      success: true,
      message: `Verification code sent to ${email} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Verification code sending failed",
    });
  }
}
