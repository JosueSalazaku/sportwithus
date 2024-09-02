import express from 'express';

import { ActivityById, allActivities, createActivity, deleteActivity, updataActivity } from '../controllers/activities';


const activitiesRouter = express.Router();

activitiesRouter.get('/', allActivities);
activitiesRouter.get('/:id', ActivityById);
activitiesRouter.post('/', createActivity);
activitiesRouter.put('/', updataActivity);
activitiesRouter.delete('/', deleteActivity);



export default activitiesRouter;
