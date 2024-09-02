import { pgTable, serial, text, varchar, integer, date } from 'drizzle-orm/pg-core';  

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
});

export const months = pgTable('months', {
  id: serial('id').primaryKey(),
  month: varchar('month', { length: 10 }).notNull(),
  activityId: integer('activity_id').references(() => activities.id).notNull(),
  year: integer('year').notNull(),
});
