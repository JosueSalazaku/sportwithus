import type { Request, Response } from 'express';
import { db } from '../db';
import { eq } from 'drizzle-orm/expressions';
import { months } from '../schema';  // Corrected import path

// Fetch all months
export const allMonths = async (req: Request, res: Response) => {
  try {
    const allMonths = await db.select().from(months).execute();
    return res.status(200).json(allMonths);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while fetching the months.' });
  }
};

// Fetch a month by ID
export const monthById = async (req: Request, res: Response) => { 
  const monthId = req.params.id;
  if (!monthId) {
    return res.status(400).json({ error: 'Missing month ID' });
  }

  try {
    const month = await db
      .select()
      .from(months)
      .where(eq(months.id, parseInt(monthId, 10)))
      .execute();

    if (month.length === 0) {
      return res.status(404).json({ error: 'Month not found' });
    }

    return res.status(200).json(month[0]);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while retrieving the month.' });
  }
};

// Create a new month
export const createMonth = async (req: Request, res: Response) => {
  const { month, activityId, date, year, activityName } = req.body;
  
  if (!month || !activityId || !date || !year || !activityName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const monthDate = new Date(date);  // No need to template string
    const newMonth = await db
      .insert(months)
      .values({
        month,
        activityId,
        activityName,
        date: monthDate.toISOString(),
        year,
      })
      .returning({
        id: months.id,
        activityId: months.activityId,
        activityName: months.activityName,
        date: months.date,
        year: months.year,
      })
      .execute();

    return res.status(201).json(newMonth[0]); 
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while creating the month.' });
  }
};

// Update a month
export const updateMonth = async (req: Request, res: Response) => { 
  const { id, month, activityId, date, year, activityName } = req.body;
  if (!id || !month || !activityId || !date || !year || !activityName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const monthDate = new Date(date);
    const updatedMonth = await db
      .update(months)
      .set({
        month, 
        activityId, 
        date: monthDate.toISOString(), 
        year, 
        activityName 
      })
      .where(eq(months.id, parseInt(id, 10)))
      .returning({
        id: months.id,
        month: months.month,
        activityId: months.activityId,
        date: months.date,
        year: months.year,
        activityName: months.activityName
      })
      .execute();

    if (updatedMonth.length === 0) {
      return res.status(404).json({ error: 'Month not found' });
    }

    return res.status(200).json(updatedMonth[0]);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while updating the month.' });
  }
};

// Delete a month
export const deleteMonth = async (req: Request, res: Response) => { 
  const monthId = req.params.id;
  if (!monthId) {
    return res.status(400).json({ error: 'Missing month ID' });
  }

  try {
    const month = await db
      .delete(months)
      .where(eq(months.id, parseInt(monthId, 10)))
      .returning({
        id: months.id,
        month: months.month,
        activityId: months.activityId,
        date: months.date,
        year: months.year,
        activityName: months.activityName
      })
      .execute();

    if (month.length === 0) {
      return res.status(404).json({ error: 'Month not found' });
    }

    return res.status(200).json(month[0]);
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while deleting the month.' });
  }
};
