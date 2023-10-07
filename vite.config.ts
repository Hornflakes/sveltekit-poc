import { Server } from 'socket.io';
import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig, type PluginOption } from 'vite';

const webSocketServer: PluginOption = {
    name: 'webSocketServer',
    configureServer: (server: ViteDevServer) => {
        if (!server.httpServer) return;

        const io = new Server(server.httpServer);
        io.on('connection', (socket) => {
            socket.emit('hello', 'Hello');
        });
    },
};

export default defineConfig({
    plugins: [sveltekit(), webSocketServer],
});
