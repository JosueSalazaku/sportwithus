import express from 'express';
import { participantById, allParticipants, createParticipant, deleteParticipant, updateParticipant } from '../controllers/participants';

const participantsRoute = express.Router();

participantsRoute.get('/', allParticipants);
participantsRoute.get('/:id', participantById);
participantsRoute.post('/', createParticipant);
participantsRoute.put('/', updateParticipant);
participantsRoute.delete('/', deleteParticipant);

export default participantsRoute;