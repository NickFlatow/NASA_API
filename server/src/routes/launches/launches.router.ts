import express from 'express';
import { httpAddNewLaunch, httpGetAllLauches, httpDeleteLaunch } from './launches.controller';

export const launchesRouter = express.Router();
//path /launches defined in app.ts app.use('/launches',launcesRouter);
launchesRouter.get('/', httpGetAllLauches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpDeleteLaunch);
 