import * as http from 'http';
import fs from 'fs';
import { app }  from './app';
import { loadPlanetsData } from './models/planets.model';
import { mongoConnect } from './services/mongo';
import { loadLaunchData } from './models/launches.model';

const PORT = process.env.PORT;
const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
console.log("starting server...")

startServer();