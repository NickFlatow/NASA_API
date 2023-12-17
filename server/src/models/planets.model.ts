import fs from 'fs';
import path from 'path';
import { parse }  from 'csv-parse';
import { dirname } from '../../utils/meta'

import { planets } from './plantes.mongo';


function isHabitablePlanet(planet:any) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
export function loadPlanetsData():Promise<void> {
    return (new Promise((resolve, reject) => {

        fs.createReadStream(path.join(dirname, '..' , 'data', 'kepler_data.csv'))
        .pipe(parse({
            comment: '#',
            columns: true,
        }))
        .on('data', async (data:any) => {
            if (isHabitablePlanet(data)) {
                savePlanet(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end',async () => {
            const habitablePlanets = await getAllPlanets();
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    }));
}


export async function getAllPlanets() {
    // empty {} means get all
    // second param is projection, which means what fields to NOT return
    return await planets.find({},{
        '_id': 0,
        '__v': 0,
    });
}

async function savePlanet(planet:{kepler_name:string}) {
    // insert + update = upsert
    try {
        await planets.updateOne({
            kepler_name: planet.kepler_name,
        },{
            kepler_name: planet.kepler_name,
        },{
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
}