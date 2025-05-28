import { build } from "vite";
import path from "path";
import fs from "fs-extra";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

fs.removeSync('/app/frontend/dist');

const buildOptions = {
    target: 'es2022',
    assetsDir: '',
    outDir: "./dist",
    emptyOutDir: false,

    rollupOptions: {
        output: {
            assetFileNames: "css/[name]-[hash].css",
            entryFileNames: "js/[name]-[hash].js"
        }
    }
};

const libraries = [
    {
        entry: path.resolve(__dirname, "./src/Home.js"),
        fileName: "home",
    },
    {
        entry: path.resolve(__dirname, "./src/Person.js"),
        fileName: "person",
    },
    {
        entry: path.resolve(__dirname, "./src/Print.js"),
        fileName: "print",
    },
];

libraries.forEach(async lib => {
    await build({
        build: {
            ...buildOptions,
            lib: {
                ...lib,
                formats: ["es"],
            },
        },
    });
});
