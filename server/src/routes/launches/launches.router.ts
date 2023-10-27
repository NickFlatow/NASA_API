import express from 'express';
import { getAllLauches } from './launches.controller';

export const launcesRouter = express.Router();
launcesRouter.get('/launches', getAllLauches);
