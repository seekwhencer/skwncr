import {defineConfig} from 'vite';
import { patchCssModules } from 'vite-css-modules'

// https://vitejs.dev/config/

export default defineConfig({
    root: '/app/frontend',
    site: 'http://frontend.apply-o-mat.servant',
    output: "browser",
    security: {
        checkOrigin: false
    },
    plugins: [
        patchCssModules()
    ],
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
    },
    build: {
        // Recommended minimum target (See FAQ for more details)
        target: 'es2022'
    }
});