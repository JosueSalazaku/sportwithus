import express from 'express';
import { allMonths, monthById, createMonth, deleteMonth, updateMonth } from '../controllers/months';

const montshRoute = express.Router();

montshRoute.get('/', allMonths);
montshRoute.get('/:id', monthById);
montshRoute.post('/', createMonth);
montshRoute.put('/', updateMonth);
montshRoute.delete('/', deleteMonth);

export default montshRoute;
