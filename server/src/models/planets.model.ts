import fs from 'fs';
import path from 'path';
import { parse }  from 'csv-parse';

// import { fileURLToPath } from 'url';
import { dirname } from '../../utils/meta'

//TODO should be type planet defined in kepler_daa.csv
export const habitablePlanets:any[] = [];


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
        .on('data', (data:any) => {
            if (isHabitablePlanet(data)) {
                habitablePlanets.push(data);
            }
        })
        .on('error', (err) => {
            console.log(err);
            reject(err);
        })
        .on('end', () => {
            habitablePlanets.map((planet) => {
                return planet['kepler_name'];
            });
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    }));
}
