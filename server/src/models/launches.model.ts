const launches = new Map<number,launch>();

let latestFlightNumber = 100;

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

const launch:launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    target: 'Kepler-442 b',
    launchDate: new Date('December 20, 2030'),
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}


launches.set(launch.flightNumber, launch);


export function getAllLaunches() {
    return Array.from(launches.values());
}
export function addNewLaunch(launch:launch) {
    latestFlightNumber++;
    launches.set(latestFlightNumber, 
        Object.assign(launch,
            {
                flightNumber: latestFlightNumber,
                sucess: true,
                upcoming: true,
                customer: ['ZTM', 'NASA'],

            }
        )
    );
}

export function deleteLaunch(id:number):false | launch {
    const launch = launches.get(id);
    if (!launch) return false;
    launch.upcoming = false;
    launch.success = false;
    return launch;
}