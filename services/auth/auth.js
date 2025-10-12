import { JWT_SECRET } from '../../config/env.js';
import { HTTP_STATUS_CODES } from '../../constants/index.js';
import { prisma } from '../../database/database.js';
import { hashPassword, JwtUtility, comparePassword, commonUtility, emailUtility } from '../../utils/index.js';

class AuthService {
  constructor() {}

  static async register(email, password) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return {
          message: 'User already exists.',
          code: HTTP_STATUS_CODES.CONFLICT,
        };
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      const token = JwtUtility.generateToken({ userId: newUser.id }, JWT_SECRET);
      if (!token) {
        return {
          message: 'Failed to generate token.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
      }
      const user = {
        id: newUser.id,
        token,
      };

      return {
        message: 'User registered successfully.',
        data: user,
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred during registration.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }
  static async login(email, password) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          message: 'User not found.',
          code: HTTP_STATUS_CODES.NOT_FOUND,
        };
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return {
          message: 'Invalid password.',
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
        };
      }

      const token = JwtUtility.generateToken({ userId: user.id }, JWT_SECRET);
      if (!token) {
        return {
          message: 'Failed to generate token.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
      }

      return {
        message: 'Login successful.',
        data: { id: user.id, token },
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred during login.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }
  static async forgotPassword(email) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          message: 'User not found.',
          code: HTTP_STATUS_CODES.NOT_FOUND,
        };
      }
      const existingOtp = await prisma.OTP.findFirst({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (existingOtp) {
        await prisma.OTP.update({
          where: { id: existingOtp.id },
          data: { isExpired: true },
        });
      }
      const otp = await prisma.OTP.create({
        data: {
          userId: user.id,
          code: commonUtility.generateOTP(),
          purpose: 'FORGOT_PASSWORD',
          isExpired: false,
          isUsed: false,
          verified: false,
          attempts: existingOtp ? existingOtp.attempts + 1 : 1,
        },
      });

      if (!otp) {
        return {
          message: 'Failed to generate OTP.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
      }
      try {
        await emailUtility.sendOtpEmail(user.email, otp.code);
      } catch (error) {
        return {
          message: 'Failed to send OTP email.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          errors: error.message,
        };
      }

      return {
        message: 'otp has been sent to your email.',
        data: { userId: user.id },
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred during password reset.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }
  static async verifyOtp(userId, otpCode) {
    try {
      const otp = await prisma.OTP.findFirst({
        where: {
          userId,
          code: otpCode,
          isExpired: false,
          isUsed: false,
          verified: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!otp) {
        return {
          message: 'No valid OTP found.',
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
        };
      }

      await prisma.OTP.update({
        where: { id: otp.id },
        data: { verified: true },
      });

      return {
        message: 'OTP verified successfully.',
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred during OTP verification.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }

  static async resendOtp(userId) {
    try {
      const existingOtp = await prisma.OTP.findFirst({
        where: {
          userId,
          isExpired: false,
          isUsed: false,
          verified: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      const otp = await prisma.OTP.create({
        data: {
          userId,
          code: await commonUtility.generateOTP(),
          purpose: 'RESEND_OTP',
          isExpired: false,
          isUsed: false,
          verified: false,
          attempts: existingOtp ? existingOtp.attempts + 1 : 1,
        },
      });

      if (!otp) {
        return {
          message: 'Failed to generate OTP.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        };
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return {
          message: 'User not found.',
          code: HTTP_STATUS_CODES.NOT_FOUND,
        };
      }

      try {
        await emailUtility.sendOtpEmail(user.email, otp.code);
      } catch (error) {
        return {
          message: 'Failed to send OTP email.',
          code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
          errors: error.message,
        };
      }

      return {
        message: 'OTP has been resent to your email.',
        data: { userId },
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred while resending the OTP.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }

  static async resetPassword(userId, newPassword, otpCode) {
    try {
      const otp = await prisma.OTP.findFirst({
        where: {
          userId,
          code: otpCode,
          isExpired: false,
          isUsed: false,
          verified: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!otp) {
        return {
          message: 'No valid OTP found.',
          code: HTTP_STATUS_CODES.UNAUTHORIZED,
        };
      }

      const hashedPassword = await hashPassword(newPassword);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      await prisma.OTP.update({
        where: { id: otp.id },
        data: { isUsed: true, isExpired: true },
      });

      return {
        message: 'Password reset successfully.',
        code: HTTP_STATUS_CODES.OK,
      };
    } catch (error) {
      return {
        message: 'An error occurred during password reset.',
        code: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error.message,
      };
    }
  }
}

export { AuthService };
