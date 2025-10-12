TEMPLATE: Improvements, Checklist and Implementation Plan

## Purpose

This document captures prioritized suggestions, concrete implementation steps, code patterns, and a checklist you can use when improving or maintaining the "express-backend-template" repository. Use it as a single reference so you can quickly bootstrap new projects from this template.

## High level goals

- Make the template secure (input validation, secrets management, rate limiting)
- Make it reliable (error handling, graceful shutdown, DB connection management)
- Improve developer experience (documentation, seed scripts, CI, tests)
- Keep it easy to extend (clear folder conventions, middleware patterns)

## Prioritized recommendations

Priority 1 — Critical

1. Input validation
   - Add request validation for all public endpoints.
   - Use express-validator or Joi.
   - Validate: required fields, email format, password strength.

2. Centralized error handling
   - Add an `asyncHandler` wrapper and express error handler middleware.
   - Map errors to sanitized responses with proper status codes.

3. Rate limiting & brute-force protection
   - Use `express-rate-limit` for login/otp endpoints; store counters in Redis for production.

4. Auth middleware & JWT lifecycle
   - Add middleware to verify tokens and attach `req.user`.
   - Add refresh-token support for long-lived sessions and implement logout.

5. Secrets management and ".env.example"
   - Add `.env.example` and document secrets management in README.

Priority 2 — Important

1. Logging and request tracing (pino/winston)
2. Graceful shutdown and Prisma disconnect
3. OTP lifecycle & anti-reuse
4. Standard error shapes and correlation IDs
5. Add tests (Jest + supertest)

Priority 3 — Nice-to-have

1. Swagger/OpenAPI docs
2. Docker and compose for dev
3. CI (GitHub Actions) that runs lint & tests
4. Postman/Insomnia collection
5. TypeScript migration (future)

## Concrete quick-wins (low-risk, high-impact)

1. Add `.env.example`
2. Add `TEMPLATE_IMPROVEMENTS.md` (this file)
3. Add `middlewares/asyncHandler.js` and `middlewares/errorHandler.js`
4. Add `validations/auth.js` and plug validators into `routes/auth/auth.js`
5. Add `middlewares/auth.js` to verify JWTs
6. Rename `readme.md` to `README.md` (convention)

## Detailed implementation plan for quick-wins

A. Add `.env.example` (safe)

- Create file `.env.example` with all env variable names used by the repo (no secrets) e.g.

```
PORT=4000
API_VERSION=v1
PREFIX=api
JWT_SECRET=replace_with_secure_secret
MAIL_EMAIL=you@example.com
MAIL_PASSWORD=your-mail-password
MAIL_SERVICE=gmail
DATABASE_URL=postgresql://user:password@localhost:5432/db
```

B. Centralized error handling + async wrapper

- Files to add:
  - `middlewares/asyncHandler.js`
  - `middlewares/errorHandler.js`

- `asyncHandler` pattern (conceptual):

```js
// asyncHandler.js
export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
```

- `errorHandler` (conceptual):

```js
// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  // map known error types
  // log error (without exposing internal stack in production)
  res.status(statusCode).json({ status: false, message: '...' });
};
```

- Wire errorHandler in `app.js` at the bottom: `app.use(errorHandler);`

C. Request validation for auth routes

- Create `validations/auth.js` with express-validator rules for each endpoint.
- Use the validator in `routes/auth/auth.js` and return `responseUtility.validationErrorResponse` on validation failures.

D. JWT auth middleware

- `middlewares/auth.js` verifies token from `Authorization` header and attaches `req.user` = { userId }.

E. Graceful shutdown

- In `app.js` capture SIGINT/SIGTERM and call `prisma.$disconnect()` and `server.close()`.

F. Add README polish & `.env.example`

- Rename `readme.md` -> `README.md` and confirm links.

## Checklist to mark off

- [ ] Add `.env.example`
- [ ] Add `middlewares/asyncHandler.js`
- [ ] Add `middlewares/errorHandler.js` and wire in `app.js`
- [ ] Add `validations/auth.js` and apply to auth routes
- [ ] Add `middlewares/auth.js` (JWT verification)
- [ ] Add rate-limiter for login/otp endpoints
- [ ] Add `.github/workflows/nodejs.yml` for CI (lint + test)
- [ ] Add `Dockerfile` and `docker-compose.yml` for dev
- [ ] Add `tests/` with Jest + supertest for auth endpoints

## Quick suggestions for libraries

- Validation: `express-validator` or `joi` (+ `celebrate` for middleware)
- Rate limiting: `express-rate-limit` (+ `rate-limit-redis` for production)
- Logging: `pino` or `winston`
- Testing: `jest`, `supertest`
- Lint & format: Keep ESLint + Prettier (already present)

## Example small tasks I can implement now (pick any)

- Create `.env.example` + commit
- Add `middlewares/asyncHandler.js` + `middlewares/errorHandler.js` and update `app.js`
- Add request validators for auth routes

If you want me to implement any of the above, pick one or more and I will:

- update the todo list
- create the files
- run quick lint
- and push the changes (or leave them for you to review locally)

## Notes

- I avoided editing core runtime logic (AuthService) so the template remains compatible with your current business logic.
- For any code changes requiring a test DB or secrets (e.g., testing email), I'll create safe fallbacks or skip running network/email operations.

End of TEMPLATE: Improvements, Checklist and Implementation Plan
