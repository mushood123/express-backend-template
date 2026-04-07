import jwt from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
class JwtUtility {
  static generateToken(payload, secretKey, options = {}) {
    const defaultOptions = {
      expiresIn: JWT_EXPIRES_IN,
      algorithm: JWT_ALGORITHM,
      ...options,
    };

    return jwt.sign(payload, secretKey, defaultOptions);
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET, {
        algorithms: [JWT_ALGORITHM],
      });
    } catch {
      throw new Error('Token verification failed');
    }
  }

  static decodeToken(token, options = {}) {
    return jwt.decode(token, options);
  }
}

export { JwtUtility };
