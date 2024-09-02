import type { Request, Response } from 'express';
import { db } from '../db';
import { eq } from 'drizzle-orm/expressions';
import { activities } from '../shema';  


export const allActivities = async (req: Request, res: Response) => {
    try {
      const allActivities = await db.select().from(activities).execute();
      return res.status(200).json(allActivities);
    } catch (err) {
      return res.status(500).json({ error: 'An error occurred while fetching the activities.' });
    }
};
  
export const ActivityById = async (req: Request, res: Response) => {
    const activityId = req.params.id;
    if (!activityId) {
        return res.status(400).json({ error: 'Missing activity ID' });
    }
  
    try {
        const activity = await db
            .select()
            .from(activities)
            .where(eq(activities.id, parseInt(activityId, 10)))
            .execute();
  
        if (activity.length === 0) {
            return res.status(404).json({ error: 'Activity not found' });
        }
  
        return res.status(200).json(activity[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while retrieving the activity.' });
    }
};
  
export const createActivity = async (req: Request, res: Response) => {
    const { name, description, location, date, time, price } = req.body;
  
    if (!name || !description || !location || !date || !time || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const activityDate = new Date(`${date}T${time}`);
      const newActivity = await db
        .insert(activities)
        .values({
          name,
          description,
          location,
          date: activityDate.toISOString(),
          price,
          participantCount: 0,  
        })
        .returning({ id: activities.id, name: activities.name, description: activities.description, location: activities.location, date: activities.date, price: activities.price, participantCount: activities.participantCount })
        .execute();
  
      return res.status(201).json(newActivity[0]); 
    } catch (error) {
      console.error('Error creating activity:', error);
      return res.status(500).json({ error: 'Failed to create activity' });
    }
};

export const updataActivity = async (req: Request, res: Response) => {
    const { id, name, description, location, date, time, price, participantCount } = req.body;
  
    if (!id || !name || !description || !location || !date || !time || !price || participantCount === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      const activityDate = new Date(`${date}T${time}`);
      const updatedActivity = await db
        .update(activities)
        .set({
          name,
          description,
          location,
          date: activityDate.toISOString(),
          price,
          participantCount,
        })
        .where(eq(activities.id, id))
        .returning({ id: activities.id, name: activities.name, description: activities.description, location: activities.location, date: activities.date, price: activities.price, participantCount: activities.participantCount })
        .execute();
  
      if (updatedActivity.length === 0) {
        return res.status(404).json({ error: 'Activity not found' });
      }
  
      return res.status(200).json(updatedActivity[0]);
    } catch (error) {
      console.error('Error updating activity:', error);
      return res.status(500).json({ error: 'Failed to update activity' });
    }
}

export const deleteActivity = async (req: Request, res: Response) => {
    const activityId = req.body.id;
  
    if (!activityId) {
      return res.status(400).json({ error: 'Missing activity ID' });
    }
  
    try {
      const deletedActivity = await db
        .delete(activities)  // Specify the table from which to delete
        .where(eq(activities.id, parseInt(activityId, 10)))  // Ensure activityId is parsed as an integer
        .returning({ 
          id: activities.id, 
          name: activities.name, 
          description: activities.description, 
          location: activities.location, 
          date: activities.date, 
          price: activities.price, 
          participantCount: activities.participantCount 
        })
        .execute();
  
      if (deletedActivity.length === 0) {
        return res.status(404).json({ error: 'Activity not found' });
      }
  
      return res.status(200).json(deletedActivity[0]);
    } catch (error) {
      console.error('Error deleting activity:', error);
      return res.status(500).json({ error: 'Failed to delete activity' });
    }
  };