import express from 'express';
import { participantById, allParticipants, createParticipant, deleteParticipant, updateParticipant } from '../controllers/participants';

const participantsRouter = express.Router();

participantsRouter.get('/', allParticipants);
participantsRouter.get('/:id', participantById);
participantsRouter.post('/', createParticipant);
participantsRouter.put('/', updateParticipant);
participantsRouter.delete('/', deleteParticipant);

export default participantsRouter;