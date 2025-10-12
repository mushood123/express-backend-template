import { AuthService } from '../../services/index.js';
import { responseUtility } from '../../utils/index.js';

class AuthController {
  static async register(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.register(email, password);
    responseUtility.sendResponse(res, result);
  }
  static async login(req, res) {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    responseUtility.sendResponse(res, result);
  }
  static async forgotPassword(req, res) {
    const { email } = req.body;
    const result = await AuthService.forgotPassword(email);
    responseUtility.sendResponse(res, result);
  }
  static async verifyOtp(req, res) {
    const { userId, otpCode } = req.body;
    const result = await AuthService.verifyOtp(userId, otpCode);
    responseUtility.sendResponse(res, result);
  }
  static async resetPassword(req, res) {
    const { userId, newPassword, otpCode } = req.body;
    const result = await AuthService.resetPassword(userId, newPassword, otpCode);
    responseUtility.sendResponse(res, result);
  }
  static async resendOtp(req, res) {
    const { userId } = req.body;
    const result = await AuthService.resendOtp(userId);
    responseUtility.sendResponse(res, result);
  }
}

export { AuthController };
