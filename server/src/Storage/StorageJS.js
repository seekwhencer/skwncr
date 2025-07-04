import fs from 'fs-extra';

export default class StorageJS {
    constructor(parent, options) {
        this.storage = parent;
        this.bundlesSourcePath = '../frontend/dist/js';

        this.loadSync();
        this.registerHiddenProperties();

        return this.js;
    }

    loadSync() {
        this.getBundlesSync();
        this.getPlainSync();
    }

    getBundlesSync() {
        const dir = fs.readdirSync(this.bundlesSourcePath);
        const files = dir.filter(i => i.match(/^(.*?)(?=\.js)/));
        const data = {};
        files.forEach(f => {
            const baseName = f.split('-')[0].toLowerCase();
            data[baseName] = f;
        });
        this.js = data;
    }

    getPlainSync() {
        const data = {};
        Object.keys(this.js).forEach((baseName) => {
            data[baseName] = fs.readFileSync(`./static/js/${this.js[baseName]}`).toString();
        });
        this.plain = data;
    }

    registerHiddenProperties() {
        const odp = Object.defineProperty;
        const mapIt = ['plain', 'loadSync'];

        mapIt.forEach(k => {
            odp(this.js, k, {
                value: typeof this[k] === 'function' ? () => this[k]() : this[k],
                enumerable: false
            });
        });
    }
}