import express from 'express';
import { allMonths, monthById, createMonth, deleteMonth, updateMonth } from '../controllers/months';

const montshRouter = express.Router();

montshRouter.get('/', allMonths);
montshRouter.get('/:id', monthById);
montshRouter.post('/', createMonth);
montshRouter.put('/', updateMonth);
montshRouter.delete('/', deleteMonth);

export default montshRouter;
