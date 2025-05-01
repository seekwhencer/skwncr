import {resolve} from 'node:path';
import viteFastify from '@fastify/vite/plugin'
import {defineConfig} from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
    root: resolve(import.meta.dirname),
    site: 'http://apply-o-mat.servant',
    output: "server",
    security: {
        checkOrigin: false
    },
    server: {
        host: true,
        port: 8080,
        strictPort: true,
        origin: 'http://apply-o-mat.servant',
        allowedHosts: true,
        cors: {
            origin: true,
        },
        proxy: {
            '/(.+\/)?images\/projects\/(.+)/g': {
                target: 'http://apply-o-map_server:8081/images',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/(.+\/)?images\/projects\/(.+)/g, ''),
            }
        }
    },
    devToolbar: {
        enabled: true
    },
    quietDeps: true,
    plugins: [
        viteFastify()
    ],
});