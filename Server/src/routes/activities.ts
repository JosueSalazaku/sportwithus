import express from 'express';
import { ActivityById, allActivities, createActivity, deleteActivity, updateActivity } from '../controllers/activities';

const activitiesRouter = express.Router();

activitiesRouter.get('/', allActivities);
activitiesRouter.get('/:id', ActivityById);
activitiesRouter.post('/', createActivity);
activitiesRouter.put('/', updateActivity);
activitiesRouter.delete('/', deleteActivity);

export default activitiesRouter;
