import { Request, Response } from 'express';
import { getAllPlanets } from '../../models/planets.model';

export async function httpGetAllPlanets(req:Request, res: Response):Promise<Response> {
    const plaents = await getAllPlanets();
    return res.status(200).json(plaents);
}