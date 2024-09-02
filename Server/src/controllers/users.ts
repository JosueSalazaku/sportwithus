import type { Request, Response } from 'express';
import { db } from '../db';
import { eq } from 'drizzle-orm/expressions';
import { users } from '../schema'; 

// Fetch all users
export const allUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await db.select().from(users).execute();
        return res.status(200).json(allUsers);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while fetching the users.' });
    }
};

export const userById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    try {
        const user = await db
            .select()
            .from(users)
            .where(eq(users.id, parseInt(userId, 10)))
            .execute();

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newUser = await db
            .insert(users)
            .values({
                name,
                email,
            })
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .execute();

        return res.status(201).json(newUser[0]);  
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedUser = await db
            .update(users)
            .set({
                name,
                email,
            })
            .where(eq(users.id, parseInt(id, 10)))
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .execute();

        if (updatedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(updatedUser[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    try {
        const deletedUser = await db
            .delete(users)
            .where(eq(users.id, parseInt(userId, 10)))
            .returning({
                id: users.id,
                name: users.name,
                email: users.email,
            })
            .execute();

        if (deletedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(deletedUser[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
};
