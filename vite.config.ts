import { sveltekit } from '@sveltejs/kit/vite';
import { type ViteDevServer, defineConfig, type PluginOption } from 'vite';
import { handleSocketIO } from './socket-handler';

const webSocketServer: PluginOption = {
    name: 'webSocketServer',
    configureServer: (server: ViteDevServer) => {
        if (!server.httpServer) return;

        handleSocketIO(server.httpServer);
    },
};

export default defineConfig({
    plugins: [sveltekit(), webSocketServer],
});
