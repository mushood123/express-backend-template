import jwt from 'jsonwebtoken';

class JwtUtility {
  static generateToken(payload, secretKey, options = {}) {
    const defaultOptions = { expiresIn: '1h', ...options };

    return jwt.sign(payload, secretKey, defaultOptions);
  }

  static verifyToken(token, secretKey) {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error('Invalid or expired token', error);
    }
  }

  static decodeToken(token, options = {}) {
    return jwt.decode(token, options);
  }
}

export { JwtUtility };
