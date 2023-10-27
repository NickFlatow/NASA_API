export const launches = new Map<number,launch>();

type launch = {
    flightNumber: number,
    mission: string,
    rocket: string,
    destination: string,
    launchDate: Date,
    customer: string[],
    upcoming: boolean,
    success: boolean
}

const launch:launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    destination: 'Kepler-442 b',
    launchDate: new Date('December 20, 2030'),
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}


launches.set(launch.flightNumber, launch);
