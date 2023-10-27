import { Request, Response } from "express";

import { launches } from "../../models/launches.model";

export function getAllLauches(req:Request, res:Response): Response {
    return res.status(200).json(Array.from(launches.values()));
}