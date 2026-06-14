import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(email: string, otp: string) {
  const mailOptions = {
    from: `"LuxeShop" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Your LuxeShop Verification Code",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">LuxeShop</h1>
          <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Email Verification</p>
        </div>
        <div style="padding: 32px 24px; text-align: center;">
          <p style="color: #374151; font-size: 15px; margin: 0 0 24px; line-height: 1.6;">
            Enter the following code to verify your email address and complete your registration:
          </p>
          <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border: 2px dashed #8b5cf6; border-radius: 12px; padding: 20px; margin: 0 auto 24px; display: inline-block;">
            <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #6366f1; font-family: 'Courier New', monospace;">${otp}</span>
          </div>
          <p style="color: #9ca3af; font-size: 13px; margin: 0; line-height: 1.5;">
            This code expires in <strong style="color: #6366f1;">5 minutes</strong>.<br/>
            If you didn't request this, please ignore this email.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 16px 24px; text-align: center; border-top: 1px solid #f3f4f6;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} LuxeShop. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
