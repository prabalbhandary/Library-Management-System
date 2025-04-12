export function generateVerificationOtpEmailTemplate(otpCode) {
  return `
        <div class="container">
        <div class="header">
            <h1>Your OTP Code</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>We have received a request to verify your identity. Please use the following One-Time Password (OTP) to proceed:</p>
            <div class="otp-code">
                ${otpCode}
            </div>
            <p>This OTP is valid for 15 minutes. If you did not request this, please ignore this email.</p>
            <a href="#" class="button">Verify Now</a>
        </div>
        <div class="footer">
            <p>If you have any questions, please contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
            <p>Thank you for using our service.</p>
        </div>
    </div>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #000000;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            background-color: #ffffff;
            color: #000000;
            padding: 20px;
            border-radius: 4px;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-top: 30px;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
    `;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>We received a request to reset your password. If you made this request, click the button below to reset your password:</p>
            <a href="${resetPasswordUrl}" class="reset-button">Reset My Password</a>
            <p>If you did not request a password reset, you can ignore this email. Your password will remain unchanged.</p>
            <p>This link will expire in 15 minutes for your security.</p>
        </div>
        <div class="footer">
            <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
            <p>Thank you for using our service.</p>
        </div>
    </div>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #007bff;
            color: white;
            padding: 10px;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
        }
        .reset-button {
            background-color: #007bff;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 4px;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
        }
        .reset-button:hover {
            background-color: #0056b3;
        }
        .footer {
            font-size: 14px;
            color: #777;
            text-align: center;
            margin-top: 30px;
        }
    </style>
    `;
}
