import express from 'express';
import { getAllPlanets } from './planets.controller';

export const planetsRouter = express.Router();

//path /planets defined in app.ts app.use('/planets',planetsRouter);
planetsRouter.get('/', getAllPlanets);
