import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';


import { planetsRouter } from './routes/planets/planets.router';
import { launchesRouter } from './routes/launches/launches.router';
import { dirname } from '../utils/meta'

//TODO CHEAP FIX FOR JEST TS ISSUE should be import.meta.url
// const file = fileURLToPath("file:///C:/Users/Nick%20Flatow/Documents/code/nasa/server/src/app.ts");
// const dir = path.dirname(file);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
export const app = express();

//add cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(cors());
app.use(morgan('combined'));
 
app.use(express.json());
app.use(express.static(path.join(dirname, '..', 'public')));
app.use('/planets',planetsRouter);
app.use('/launches',launchesRouter);

// /* enbales react routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(dirname, '..', 'public', 'index.html'));
});