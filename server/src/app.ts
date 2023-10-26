import express from 'express';
import path from 'path';
import cors from 'cors';
import { planetsRouter } from './routes/planets/planets.router';

export const app = express();

//add cors
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
app.use(cors());
app.use(express.json());
console.log(path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(planetsRouter);