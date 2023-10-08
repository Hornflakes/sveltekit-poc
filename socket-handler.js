import { Server } from 'socket.io';

export const handleSocketIO = (/** @type any */ server) => {
    const io = new Server(server);
    let connections = 0;

    io.on('connection', (socket) => {
        io.emit('connections', ++connections);

        socket.on('chat', (message) => {
            io.emit('chat', message);
        });

        socket.on('disconnect', () => {
            io.emit('connections', --connections);
        });
    });
};
