import express from 'express';
import { ActivityById, allActivities, createActivity, deleteActivity, updateActivity } from '../controllers/activities';

const activitiesRoute = express.Router();

activitiesRoute.get('/', allActivities);
activitiesRoute.get('/:id', ActivityById);
activitiesRoute.post('/', createActivity);
activitiesRoute.put('/', updateActivity);
activitiesRoute.delete('/', deleteActivity);

export default activitiesRoute;
