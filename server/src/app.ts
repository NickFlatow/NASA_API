import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

import { planetsRouter } from './routes/planets/planets.router';
import { launcesRouter } from './routes/launches/launches.router';


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
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetsRouter);
app.use(launcesRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});