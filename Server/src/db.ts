import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";
import postgres from "postgres";
import { users, activities, months, participants } from "./schema";

dotenv.config();

const connectionString = process.env.DATABASE_URL || '';

const client = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, // Use SSL for Supabase connections
  prepare: false // Optional: depending on if you need prepared statements
});

export const db = drizzle(client);

export const allUsers = db.select().from(users);
export const allActivities = db.select().from(activities);
export const allMonths = db.select().from(months);
export const allParticipants = db.select().from(participants);
