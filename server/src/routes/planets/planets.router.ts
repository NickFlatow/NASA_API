import express from 'express';
import { getAllPlanets } from './planets.controller';

export const planetsRouter = express.Router();
planetsRouter.get('/planets', getAllPlanets);
