import nodemailer from 'nodemailer';
import { MAIL_EMAIL, MAIL_PASSWORD, MAIL_SERVICE } from './env.js';

const transporter = nodemailer.createTransport({
  service: MAIL_SERVICE,
  auth: {
    user: MAIL_EMAIL,
    pass: MAIL_PASSWORD,
  },
});

export { transporter };
