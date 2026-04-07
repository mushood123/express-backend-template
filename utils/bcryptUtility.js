import bcrypt from 'bcryptjs';
import { SALT_ROUNDS } from '../config/env.js';

const bcryptCompare = (hashedPassword, password) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const hashPassword = async password => {
  if (!password) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  if (!password) {
    return false;
  }
  const isMatch = await bcryptCompare(hashedPassword, password);

  return isMatch;
};

export { comparePassword, hashPassword };
