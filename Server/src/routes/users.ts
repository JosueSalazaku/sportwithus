import express from 'express';
import { allUsers, monthById, createMonth, deleteMonth, updateMonth } from '../controllers/users';


const usersRouter = express.Router();

usersRouter.get('/', allUsers);
usersRouter.get('/:id', monthById);
usersRouter.post('/', createMonth);
usersRouter.put('/', updateMonth);
usersRouter.delete('/', deleteMonth);

export default usersRouter;
