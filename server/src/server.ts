// using http allow for more modular code and connection to websockets
import * as http from 'http';
import { app }  from './app';


const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});