import http from 'http';
import { Server } from 'socket.io';
import { listen } from './sockets';
import { api as apiServer } from './api';

const PORT = 5000;
const httpServer = http.createServer(apiServer);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

httpServer.listen(PORT);
listen(io);
console.log(`Server listening on port ${PORT}`);

