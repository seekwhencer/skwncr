import {defineConfig} from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
    base: `${process.env?.VITE_BASE || './'}`,
    output: "browser",
    security: {
        checkOrigin: false
    },
    server: {
        host: true,
        port: process.env?.FRONTEND_PORT || 8080,
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
        target: 'es2022',
        assetsDir: '',
        rollupOptions: {
            output: {
                assetFileNames: "css/[name]-[hash][extname]",
                entryFileNames: "js/[name]-[hash].js"
            }
        }
    }
});