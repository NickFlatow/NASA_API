// using http allow for more modular code and connection to websockets
import * as http from 'http';
import { app }  from './app';
import { loadPlanetsData } from './models/planets.model';

// const PORT = process.env.PORT || 3001;
const PORT = 8000;
const server = http.createServer(app);
    

async function startServer() {
    await loadPlanetsData();
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();