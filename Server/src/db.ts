import { drizzle } from 'drizzle-orm/postgres-js'
import dotenv from 'dotenv';
import postgres from 'postgres'
import { users } from "./shema"


dotenv.config();

const connectionString = process.env.DATABASE_URL ?? ''
export const client = postgres(connectionString)
export const db = drizzle(client);

export const allUsers = db.select().from(users);