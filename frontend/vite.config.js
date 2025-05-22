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
            origin: false,
        },
        proxy: {
            '/': {
                target: 'http://apply-o-mat_server:8081',
                bypass: (req, res, proxyOptions) => {

                    // skipping all needs for the HMR (like served node modules
                    // or something that is in the bundle later

                    if (req.url.match(/\/@vite\/(.+)/))
                        return req.url;

                    if (req.url.match(/\/src\/(.+)/))
                        return req.url;

                    if (req.url.match(/\/node_modules\/(.+)/))
                        return req.url;

                    if (req.url.match(/\/@fs\/(.+)/))
                        return req.url;

                },
                changeOrigin: true
            }
        }
    },
    devToolbar: {
        enabled: true
    },
    /*build: {
        target: 'es2022',
        assetsDir: '',

        rollupOptions: {
            outDir: "./dist",
            input: {
                home: 'src/Home.js',
                person: 'src/Person.js'
            },

            output: {
                assetFileNames: "css/[name]-[hash].css",
                entryFileNames: "js/[name]-[hash].js"
            }
        }
    },*/
    esbuild: {
        legalComments: 'none'
    }
});