
import * as http from 'http';
import { app }  from './app';
import { loadPlanetsData } from './models/planets.model';
import { mongoConnect } from './services/mongo';

// const PORT = process.env.PORT || 3001;
const PORT = 3001;
const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();