import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.local',
});

const {
  SINGLESTORE_HOST,
  SINGLESTORE_USER,
  SINGLESTORE_PASSWORD,
  SINGLESTORE_PORT,
  SINGLESTORE_DATABASE,
} = process.env;

const connectionString = `mysql2://${SINGLESTORE_USER}:${SINGLESTORE_PASSWORD}@${SINGLESTORE_HOST}:${SINGLESTORE_PORT}/${SINGLESTORE_DATABASE}?ssl={"rejectUnauthorized":false}&sslcert=singlestore_bundle.pem`;

export default {
  dialect: 'mysql',
  schema: './lib/schema.ts',
  out: './lib',
  dbCredentials: {
    url: connectionString,
  },
} satisfies Config;
