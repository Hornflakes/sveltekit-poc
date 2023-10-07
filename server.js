import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { handler } from './build/handler.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server);
io.on('connection', (socket) => {
    socket.emit('hello', 'Hello');
});

app.use(handler);
server.listen(6969);
