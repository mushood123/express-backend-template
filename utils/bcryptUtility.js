import bcrypt from 'bcryptjs';

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
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  if (!password) {
    return false;
  }
  const isMatch = await bcryptCompare(hashedPassword, password);

  return isMatch;
};

export { hashPassword, comparePassword };
