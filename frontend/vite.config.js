import {defineConfig} from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
    root: '/app/frontend',
    site: 'http://frontend.apply-o-mat.servant',
    output: "browser",
    security: {
        checkOrigin: false
    },
    server: {
        host: true,
        port: 8080,
        strictPort: true,
        origin: 'http://frontend.apply-o-mat.servant',
        allowedHosts: true,
        cors: {
            origin: true,
        }
    },
    devToolbar: {
        enabled: true
    }
});