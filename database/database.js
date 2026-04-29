import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '../config/env.js';
import { logger } from '../config/logger.js';

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
  log: ['error', 'query', 'info', 'warn'],
});

prisma
  .$connect()
  .then(() => {
    logger.info('Successfully connected to the database');
  })
  .catch(error => {
    logger.error(`Failed to connect to the database: ${error.message}`);
    throw new Error(`❌ Failed to connect to the database: ${error.message}`);
  });
