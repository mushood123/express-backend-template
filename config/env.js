import { config } from 'dotenv';

config();

export const { PORT, API_VERSION, PREFIX, JWT_SECRET, MAIL_PASSWORD, MAIL_EMAIL, MAIL_SERVICE } = process.env;
