import { pgTable, serial, text, varchar, integer, date, numeric } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),  
  phone: varchar('phone', { length: 256 }).notNull(),
});

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: date('date').notNull(),  
  location: varchar('location', { length: 255 }).notNull(),
  participantCount: integer('participant_count').default(0).notNull(),  
  price: numeric('price', { precision: 10, scale: 2 }).notNull().default('0'), 
});

export const months = pgTable('months', {
  id: serial('id').primaryKey(),
  month: varchar('month', { length: 10 }).notNull(),
  date: date('date').notNull(), 
  activityId: integer('activity_id').references(() => activities.id).notNull(),
  activityName: varchar('activity_name', { length: 255 }).notNull(),  // New column for activity name
  year: integer('year').notNull(),
});

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  activityId: integer('activity_id').references(() => activities.id).notNull(), 
  fullName: varchar('full_name', { length: 255 }).notNull(),  
  email: varchar('email', { length: 255 }).notNull(),
});
