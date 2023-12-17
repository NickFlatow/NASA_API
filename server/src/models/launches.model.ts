import { launches } from "./launches.mongo";
import { planets } from "./plantes.mongo";
const flarg = new Map<number,launch>();

const DEFAULT_FLIGHT_NUMBER = 100;

export type launch = {
    flightNumber: number,
    mission: string,
    rocket: string,
    target: string,
    launchDate: Date,
    customer: string[],
    upcoming: boolean,
    success: boolean
}

// const launch:launch = {
//     flightNumber: 100,
//     mission: 'Kepler Exploration X',
//     rocket: 'Explorer IS1',
//     target: 'Kepler-442 b',
//     launchDate: new Date('December 20, 2030'),
//     customer: ['ZTM', 'NASA'],
//     upcoming: true,
//     success: true,
// }


// launches.set(launch.flightNumber, launch);
export async function addNewLaunch(launch:launch) {
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
        const planet = await planets.findOne({
            kepler_name: launch.target
        });

        if (!planet) {
            throw new Error(`No matching planet found with name ${launch.target}`);
        }
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


export async function getAllLaunches() {
    return await launches.find({},{
        '_id': 0,
        '__v': 0,
    });
    // return Array.from(launches.values());
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
