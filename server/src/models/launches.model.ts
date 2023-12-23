import { launches } from "./launches.mongo";
import { planets } from "./plantes.mongo";
const flarg = new Map<number,launch>();

const DEFAULT_FLIGHT_NUMBER = 100;

export type launch = {
    flightNumber: number, //flight_number
    mission: string, //name
    rocket: string, //rocket.name
    target?: string, //NA
    launchDate: Date, //date_local
    customer: string[], //payloads.customers for each payload
    upcoming: boolean,//upcoming
    success: boolean //success
}

export async function loadLaunchData() {
    //first launch from SpaceX API
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    //If we find a launch, we don't need to load launch data
    if (firstLaunch) {
        console.log('Launch data already loaded!');
    } else {
        //if we do not have this data in our database then load it from the SpaceX API
        await loadSpaceXLaunches();
    }
}

async function loadSpaceXLaunches() {
    console.log('Downloading launch data from SpaceX API...');
    const SPACE_X_API_URL = 'https://api.spacexdata.com/v4/launches/query';
    const result =  await fetch(SPACE_X_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: {},
                options: {
                    pagination: false,
                    populate: [
                        {
                            path: 'rocket',
                            select: {
                                name: 1,
                            },
                        },
                        {
                            path: 'payloads',
                            select: {
                                customers: 1,
                            },
                        },
                    ],
                }
            }),
    }); 
    if (!result.ok) {
        console.log('Problem downloading launch data');
        throw new Error('Launch data download failed');
    }
    const spaceXLaunches = await result.json();
    const launchDocs = spaceXLaunches.docs;
    parseLaunches(launchDocs);
}
function parseLaunches(launchDocs: any[]) {
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc.payloads;
        const customers = payloads.flatMap((payload:any) => {
            return payload.customers;
        });
        const launch:launch = {
            flightNumber: launchDoc.flight_number, 
            mission: launchDoc.name,
            rocket: launchDoc.rocket.name,
            launchDate: launchDoc.date_local,
            customer: customers,
            upcoming: launchDoc.upcoming,
            success: launchDoc.success,
        }
        // console.log(launch);
        console.log(`${launch.flightNumber} ${launch.mission}`);
        saveLaunch(launch);
    }
} 


async function findLaunch(filter: any):Promise<launch | null> {
    return await launches.findOne(filter);
}
async function existsLaunchWithId(id:number):Promise<launch> {
    return await findLaunch({
        flightNumber: id,
    }) as launch;
}


export async function addNewLaunch(launch:launch) {
    const planet = await planets.findOne({
        kepler_name: launch.target
    });

    if (!planet) {
        throw new Error(`No matching planet found with name ${launch.target}`);
    }
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        sucess: true,
        upcoming: true,
        customer: ['ZTM', 'NASA'],
    });
    await saveLaunch(newLaunch);
}
async function getLatestFlightNumber(): Promise<number> {
    const latestLaunch = await launches.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
export async function saveLaunch(launch:launch) {
    try {

        await launches.updateOne({
            //does this flightNumber exist? in MongoDB then update
            flightNumber: launch.flightNumber,
        },
            // if not then insert
            launch,
        {
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
}


export async function getAllLaunches(limit:number, skip:number) {
    return await launches
        .find({},{'_id': 0,'__v': 0,})
        .skip(skip)
        .limit(limit)
        //1 ascending order; -1 descending order
        .sort({flightNumber: 1});
}


export async function deleteLaunch(id:number):Promise<Boolean> {
    // console.log("deleteLaunch " + id);
    const launch = await launches.findOne({flightNumber: id});
    if (!launch) return false;
    const aborted = await launches.updateOne({flightNumber: id},{
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}
