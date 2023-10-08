import express from 'express';
import http from 'http';
import { handleSocketIO } from './socket-handler.js';
import { handler } from './build/handler.js';

const app = express();
const server = http.createServer(app);

handleSocketIO(server);

app.use(handler);
server.listen(6969);
