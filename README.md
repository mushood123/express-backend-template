# express-backend-template

This repository is an Express.js backend template focused on authentication flows (register, login, forgot/reset password using OTPs) backed by Prisma (PostgreSQL). It includes utilities for password hashing, JWT handling, email (nodemailer) and a small set of organized controllers, services and routes.

## Table of contents

- Project overview
- Quick start
- Environment variables
- API structure and routes
- Controllers & Services
- Utilities
- Database (Prisma) schema
- Email templates
- Scripts

## Project folder structure

```
/ (project root)
├─ app.js
├─ eslint.config.js
├─ package.json
├─ readme.md
├─ config/
│  ├─ env.js
│  └─ nodeMailer.js
├─ constants/
│  ├─ index.js
│  ├─ messages.js
│  ├─ status.js
│  └─ statusCodes.js
├─ controllers/
│  ├─ index.js
│  └─ auth/
│     ├─ auth.js
│     └─ index.js
├─ database/
│  └─ database.js
├─ emailTemplates/
│  ├─ index.js
│  └─ sendOtp.js
├─ middlewares/
│  └─ index.js
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
│     └─ <migration-folders>
├─ routes/
│  ├─ index.js
│  └─ auth/
│     ├─ auth.js
│     └─ index.js
├─ services/
│  ├─ index.js
│  └─ auth/
│     ├─ auth.js
│     └─ index.js
├─ utils/
│  ├─ bcryptUtility.js
│  ├─ commonUtility.js
│  ├─ emailUtility.js
│  ├─ index.js
│  ├─ jwtUtility.js
│  └─ responseUtility.js
├─ validations/
│  └─ index.js
└─ vscode/
  └─ settings.json

```

## Project overview

Key ideas and conventions used in this template:

- Express app entry is `app.js`.
- Routes are prefixed with `/${PREFIX}/${API_VERSION}` (configured via env).
- Authentication flows are implemented under `/auth` routes and handled by `AuthController` -> `AuthService`.
- Prisma is used as ORM with a PostgreSQL datasource configured by `DATABASE_URL`.
- OTPs are stored in the `OTP` table and sent via email using nodemailer.

## Quick start

1. Install dependencies (yarn is used in the project):

```bash
yarn install
```

2. Create a `.env` file in the project root and set the required environment variables (see next section).

3. Run the development server:

```bash
yarn dev
```

or to run production:

```bash
yarn start
```

## Environment variables

The app reads configuration from environment variables (via `dotenv`) in `config/env.js`. The variables the code expects are:

- PORT - port number the server listens on (required)
- API_VERSION - API version string used in route prefix (e.g. `v1`)
- PREFIX - API prefix (for example `api`)
- JWT_SECRET - secret used to sign JWTs
- MAIL_EMAIL - email address used as the `from` address for nodemailer
- MAIL_PASSWORD - password / app password for the mail account
- MAIL_SERVICE - nodemailer service name (e.g. `gmail`)
- DATABASE_URL - Prisma/Postgres connection string (set in your `.env` — e.g. `postgresql://user:pass@host:5432/dbname`)

Example `.env` (DO NOT commit real secrets):

```
PORT=4000
API_VERSION=v1
PREFIX=api
JWT_SECRET=your_jwt_secret_here
MAIL_EMAIL=example@gmail.com
MAIL_PASSWORD=app-password-or-password
MAIL_SERVICE=gmail
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
```

## API structure and routes

Top-level routing is registered in `routes/index.js` and mounts:

- `/${PREFIX}/${API_VERSION}/auth` -> `routes/auth/auth.js`
- `/${PREFIX}/${API_VERSION}/health` -> simple health check

Auth endpoints (defined in `routes/auth/auth.js`):

- POST /auth/login — body: { email, password }
- POST /auth/sign-up — body: { email, password }
- POST /auth/forgot-password — body: { email }
- POST /auth/reset-password — body: { userId, newPassword, otpCode }
- POST /auth/verify-otp — body: { userId, otpCode }
- POST /auth/resend-otp — body: { userId }
- POST /auth/logout — not implemented (placeholder)

All controller methods call the `AuthService` and then use `responseUtility.sendResponse` to send consistent JSON responses.

## Controllers & Services

- `controllers/auth/auth.js` — Receives HTTP requests, extracts parameters, calls `AuthService` methods and delegates to `responseUtility`.
- `services/auth/auth.js` — Business logic and DB interactions using Prisma.

AuthService responsibilities:

- register(email, password): checks existing user, hashes password, creates user, returns JWT.
- login(email, password): validates credentials and returns JWT.
- forgotPassword(email): creates an OTP record, sends OTP email.
- verifyOtp(userId, otpCode): verifies OTP record.
- resendOtp(userId): creates and emails a new OTP.
- resetPassword(userId, newPassword, otpCode): validates OTP and updates the user's password.

Errors and success responses follow constants in `constants/*` and are formatted by `responseUtility`.

## Utilities

Located in `utils/` and exported by `utils/index.js`:

- `bcryptUtility.js` — `hashPassword` (bcrypt.hash) and `comparePassword`.
- `jwtUtility.js` — token generation, verification and decode wrappers around `jsonwebtoken`.
- `emailUtility.js` — builds email using the `emailTemplates/sendOtp.js` template and sends via nodemailer transporter in `config/nodeMailer.js`.
- `commonUtility.js` — small helpers like `generateOTP()`.
- `responseUtility.js` — consistent API response formats and helper methods.

## Database (Prisma) schema

Schema is in `prisma/schema.prisma`. The main models:

- User
  - id: String (uuid)
  - email: String (unique)
  - password: String
  - createdAt, updatedAt
  - otps: relation to OTP

- OTP
  - id: String (uuid)
  - code: String (the OTP code)
  - userId: String (FK to User)
  - purpose: enum (FORGOT_PASSWORD | RESEND_OTP)
  - createdAt, isExpired, isUsed, attempts, verified

Prisma client is instantiated in `database/database.js`. It connects at startup and logs connection success/failure.

## Email templates

OTP email content is in `emailTemplates/sendOtp.js`. It produces a simple HTML template that includes the OTP and recipient email.

## Scripts

Key scripts from `package.json`:

- `yarn start` — runs `node app.js`.
- `yarn dev` — runs `nodemon app.js` for development.
- `yarn lint` — runs ESLint on the project.
- `yarn lint:fix` — runs ESLint with `--fix`.
- `yarn format` — runs Prettier to format code.
