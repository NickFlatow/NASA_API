import express from 'express';

import { planetsRouter } from './planets/planets.router';
import { launchesRouter } from './launches/launches.router';
import { authRouter } from './auth/auth.router';

export const api = express();

api.use('/planets',planetsRouter);
api.use('/launches',launchesRouter);
// api.use('/auth',authRouter);
