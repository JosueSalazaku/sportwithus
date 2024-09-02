import type { Request, Response } from 'express';
import { db } from '../db';
import { eq } from 'drizzle-orm/expressions';
import { participants } from '../schema';

export const allParticipants = async (req: Request, res: Response) => {
    try {
        const allParticipants = await db.select().from(participants).execute();
        return res.status(200).json(allParticipants);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while fetching the participants.' });
    }
};

export const participantById = async (req: Request, res: Response) => {
    const participantsId = req.params.id;
    if (!participantsId) {
        return res.status(400).json({ error: 'Missing participant ID' });
    }

    try {
        const participant = await db
            .select()
            .from(participants)
            .where(eq(participants.id, parseInt(participantsId, 10)))
            .execute();

        if (participant.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        return res.status(200).json(participant[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while retrieving the participant.' });
    }
};

export const createParticipant = async (req: Request, res: Response) => {
    const { activityId, fullName, email } = req.body;

    if (!activityId || !fullName || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newParticipant = await db
            .insert(participants)
            .values({
                activityId,
                fullName,
                email,
            })
            .returning({
                id: participants.id,
                activityId: participants.activityId,
                fullName: participants.fullName,
                email: participants.email,
            })
            .execute();

        return res.status(201).json(newParticipant[0]);  // Return the first (and only) inserted participant
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while creating the participant.' });
    }
};

export const updateParticipant = async (req: Request, res: Response) => {
    const { id, activityId, fullName, email } = req.body;

    if (!id || !activityId || !fullName || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const updatedParticipant = await db
            .update(participants)
            .set({
                activityId,
                fullName,
                email,
            })
            .where(eq(participants.id, parseInt(id, 10)))
            .returning({
                id: participants.id,
                activityId: participants.activityId,
                fullName: participants.fullName,
                email: participants.email,
            })
            .execute();

        if (updatedParticipant.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        return res.status(200).json(updatedParticipant[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while updating the participant.' });
    }
};

export const deleteParticipant = async (req: Request, res: Response) => {
    const participantsId = req.params.id;
    if (!participantsId) {
        return res.status(400).json({ error: 'Missing participant ID' });
    }

    try {
        const deletedParticipant = await db
            .delete(participants)
            .where(eq(participants.id, parseInt(participantsId, 10)))
            .returning({
                id: participants.id,
                activityId: participants.activityId,
                fullName: participants.fullName,
                email: participants.email,
            })
            .execute();

        if (deletedParticipant.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        return res.status(200).json(deletedParticipant[0]);
    } catch (err) {
        return res.status(500).json({ error: 'An error occurred while deleting the participant.' });
    }
};
