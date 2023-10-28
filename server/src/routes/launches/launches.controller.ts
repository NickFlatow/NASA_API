import { Request, Response } from "express";

import { getAllLaunches,addNewLaunch,deleteLaunch,launch } from "../../models/launches.model";

export function httpGetAllLauches(req:Request, res:Response): Response {
    return res.status(200).json(getAllLaunches());
}
export function httpAddNewLaunch(req:Request, res:Response): Response {
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
    addNewLaunch(req.body)
    return res.status(201).json(launch);
}
export function httpDeleteLaunch(req:Request, res:Response): Response {
    const flightNumber = parseInt(req.params.id);
    const launch = deleteLaunch(flightNumber);
    
    if (launch) return res.status(200).json(launch);
    
    return res.status(404).json({
        error:"Launch Id does not exist"
    })
}
