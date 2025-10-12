export const sendOtp = (email, otp) => `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 40px 30px;">
                <p style="font-size: 16px; margin-bottom: 25px;">Hello,</p>
                
                <p style="font-size: 16px; margin-bottom: 25px;">We received a request to verify your email address: <strong style="color: #4a90e2;">${email}</strong></p>
                
                <p style="font-size: 18px; font-weight: bold; color: #4a90e2; text-align: center; margin: 30px 0;">Your One-Time Password (OTP) is:</p>
                
                <p style="font-size: 32px; font-weight: bold; text-align: center; color: #333; letter-spacing: 4px; margin: 20px 0;">${otp}</p>
                
                <p style="font-size: 16px; margin-top: 30px;">This OTP is valid for a limited time. Please do not share it with anyone.</p>
                
                <p style="font-size: 16px; margin-top: 30px;">
                    If you did not request this, please ignore this email or contact support.
                </p>

                <p style="font-size: 16px; margin-top: 30px;">
                    Best regards,<br>
                    <strong>The Mushood Team</strong>
                </p>
            </td>
        </tr>
    </table>
</div>
`;
