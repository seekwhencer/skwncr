import fs from 'fs-extra';

export default class StorageCSS {
    constructor(parent, options) {
        this.storage = parent;
        this.bundlesSourcePath = '../frontend/dist/css';

        this.loadSync();
        this.registerHiddenProperties();

        return this.css;
    }

    loadSync() {
        this.getBundlesSync();
        this.getPlainSync();
    }

    getBundlesSync() {
        const dir = fs.readdirSync(this.bundlesSourcePath);
        const files = dir.filter(i => i.match(/^(.*?)(?=\.css)/));
        const data = {};
        files.forEach(f => {
            const baseName = f.split('-')[0];
            data[baseName] = f;
        });
        this.css = data;
    }

    getPlainSync() {
        const data = {};
        Object.keys(this.css).forEach((baseName) => {
            data[baseName] = fs.readFileSync(`./static/css/${this.css[baseName]}`).toString();
        });
        this.plain = data;
    }

    registerHiddenProperties() {
        const odp = Object.defineProperty;
        const mapIt = ['plain', 'loadSync'];

        mapIt.forEach(k => {
            odp(this.css, k, {
                value: typeof this[k] === 'function' ? () => this[k]() : this[k],
                enumerable: false
            });
        });
    }
}