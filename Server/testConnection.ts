import { Client } from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());