import { MAIL_EMAIL } from '../config/env.js';
import { transporter } from '../config/nodeMailer.js';
import { sendOtp } from '../emailTemplates/index.js';

class emailUtility {
  static async sendOtpEmail(email, otp) {
    try {
      const mailOptions = {
        from: MAIL_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        html: sendOtp(email, otp),
      };

      const info = await transporter.sendMail(mailOptions);

      return info;
    } catch (error) {
      throw new Error('Error sending OTP email', error);
    }
  }
}

export { emailUtility };
