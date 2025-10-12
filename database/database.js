import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

prisma
  .$connect()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('✅ Successfully connected to the database');
  })
  .catch(error => {
    throw new Error(`❌ Failed to connect to the database: ${error.message}`);
  });
