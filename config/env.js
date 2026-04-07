import { config } from 'dotenv';

config();

export const {
  PORT,
  API_VERSION,
  PREFIX,
  JWT_SECRET,
  MAIL_PASSWORD,
  MAIL_EMAIL,
  MAIL_SERVICE,
  DATABASE_URL,
  FRONTEND_URL,
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  SALT_ROUNDS,
  PEPPER,
} = process.env;
