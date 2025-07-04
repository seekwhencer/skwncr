import fs from 'fs-extra';
import {resolve} from 'node:path';

export default class StorageData {
    constructor(parent, options) {
        this.storage = parent;
        this.options = options;
        this.dataRealPath = resolve(`${import.meta.dirname}'../../../../data/data.json`);

        if (this.options.silent !== true) {
            this.loadSync();
        } else {
            this.data = {};
            this.registerHiddenProperties();
        }

        // export only the data
        return this.data;
    }

    /**
     * append hidden (not enumerable) properties to the data object
     * the "this" scope in any function targets the data itself - not the class! (maybe)
     * any additional property must be added with "appendHiddenProperties"
     * beware: don't override existing properties from underlying "object" class!
     */
    registerHiddenProperties() {
        const odp = Object.defineProperty;
        const mapIt = ['test', 'load', 'loadSync'];

        mapIt.forEach(k => {
            odp(this.data, k, {
                value: () => this[k](),
                enumerable: false
            });
        });
    }

    load() {
        return new Promise((resolve, reject) => {
            this.loadSync();
            resolve();
        });
    }

    loadSync() {
        if (fs.existsSync(this.dataRealPath)) {
            this.data = fs.readJSONSync(this.dataRealPath);
            this.registerHiddenProperties();
            return true;
        }
        return false;
    }

    test() {
        console.log('>>>>>>>>>> ACCESSING DATA', this);
    }
}