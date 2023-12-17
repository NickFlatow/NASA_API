import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';


//TODO CHEAP FIX FOR JEST TS ISSUE should be import.meta.url
import { dirname } from '../utils/meta'
// const file = fileURLToPath("file:///C:/Users/Nick%20Flatow/Documents/code/nasa/server/src/app.ts");
// const dir = path.dirname(file);
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


import { api } from './routes/api';


export const app = express();

//add cors
app.use(cors());
app.use(morgan('combined'));
 
app.use(express.json());
app.use(express.static(path.join(dirname, '..', 'public')));

app.use('/v1', api);
//to create v2 api
// app.use('/v2', v2Router);

// /* enbales react routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(dirname, '..', 'public', 'index.html'));
});