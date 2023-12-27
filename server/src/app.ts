import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
//TODO CHEAP FIX FOR JEST TS ISSUE should be import.meta.url
// import { dirname } from '../utils/meta';
import { api } from './routes/api';

export const app = express();
// Convert the URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// app.use(helmet());
//add cors
app.use(cors());
app.use(morgan('combined'));
 
app.use(express.json());
// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/v1', api);
//to create v2 api
// app.use('/v2', v2Router);

// /* enbales react routing
app.get('/*', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});