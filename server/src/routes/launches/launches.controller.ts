import { Request, Response } from "express";

import { getAllLaunches,addNewLaunch,deleteLaunch as abortLaunch,launch } from "../../models/launches.model";
import { getPagination } from "../../services/query";

export async function httpGetAllLauches(req:Request, res:Response): Promise<Response> {
    const { skip, limit } = getPagination(req.query)
    const launches = await getAllLaunches(limit, skip);
    return res.status(200).json(launches);
}
export async function httpAddNewLaunch(req:Request, res:Response): Promise<Response> {
    // console.log(req.body);
    const launch:launch = req.body;
    
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property'
        });
    }
    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate.getTime())){
        return res.status(400).json({
            error: 'Invalid launch date'
        });
    }
    await addNewLaunch(req.body)
    return res.status(201).json(launch);
}
export async function httpDeleteLaunch(req:Request, res:Response): Promise<Response> {
    const flightNumber = parseInt(req.params.id);
    const aborted =  await abortLaunch(flightNumber);
    
    if (aborted) return res.status(200).json(aborted);
    
    return res.status(400).json({
        error:"Launch Id does not exist"
    })
}
