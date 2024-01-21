import express from 'express';

export const api = express();

api.use(express.static('./public/dist'));
api.use('/',express.static('index.html'));

