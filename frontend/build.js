import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const buildOptions = {
    target: 'es2022',
    assetsDir: '',
    outDir: "./dist",

    rollupOptions: {
        outDir: "./dist",
        emptyOutDir: true,
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
