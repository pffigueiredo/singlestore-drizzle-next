import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import fs from 'fs';
import * as schema from './schema';
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

export const connection = await mysql.createConnection({
  host: SINGLESTORE_HOST,
  port: Number(SINGLESTORE_PORT),
  user: SINGLESTORE_USER,
  password: SINGLESTORE_PASSWORD,
  database: SINGLESTORE_DATABASE,
  ssl: {
    ca: fs.readFileSync('singlestore_bundle.pem'),
  },
  multipleStatements: true,
});

export const db = drizzle(connection, { schema, mode: 'default' });
export * from './schema';
