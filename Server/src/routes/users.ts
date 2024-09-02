import express from 'express';
import { allUsers, userById, createUser, deleteUser, updateUser } from '../controllers/users';


const usersRoute = express.Router();

usersRoute.get('/', allUsers);
usersRoute.get('/:id', userById);
usersRoute.post('/', createUser);
usersRoute.put('/', updateUser);
usersRoute.delete('/', deleteUser);

export default usersRoute;
