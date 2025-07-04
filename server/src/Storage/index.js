import fs from 'fs-extra';
import Image from '../ThumbnailGenerator/Image.js';
import Data from '../../../data/data.json' with {type: 'json'};
import StoragePDF from "./StoragePDF.js";

export default class Storage {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.label = 'STORAGE';
        this.debug = false;

        // in memory
        this.data = Data;

        this.imagesRootPath = "/app/server/static/images";
        this.thumbnailsRootPath = '/app/server/static/images/thumbs';
        this.availableImageFolders = ['', 'projects'];
        this.availableExtensions = ['jpg', 'jpeg', 'png'];
        this.sizes = {
            bh: {
                label: 'blur hash',
                w: 100,
                h: 100
            },
            xs: {
                label: 'x small',
                w: 300,
                h: 300
            },
            s: {
                label: 'small',
                w: 600,
                h: 600
            },
            m: {
                label: 'medium',
                w: 1024,
                h: 1024
            },
            l: {
                label: 'large',
                w: 1920,
                h: 1920
            },
            xl: {
                label: 'large',
                w: 3840,
                h: 3840
            },
            o: {
                label: 'original'
            }
        }

        // the bundle hash
        this.css = this.getCSS();
        this.js = this.getJS();

        // the file content
        this.cssPlain = this.getCSSPlain();
        this.jsPlain = this.getJSPlain();

        this.pdf = new StoragePDF(this, {});

    }

    /**
     *
     * @param fileName
     * @param folderName
     * @param query
     * @returns {Promise}
     */
    imageExists(fileName, folderName, query) {

        return new Promise((resolve, reject) => {
            if (!this.availableImageFolders.includes(folderName))
                reject('FOLDER NOT ALLOWED');

            const imageSize = `${query ? query?.s ? query?.s : 'o' : ''}`.toLowerCase();
            if (!Object.keys(this.sizes).includes(imageSize))
                reject('SIZE NOT ALLOWED:', imageSize);

            const image = new Image(this, {
                fileName: fileName,
                folderName: folderName,
                imageSize: imageSize
            });

            if (image === false)
                resolve(false);

            image.on('thumbnail-finished', () => {
                resolve(image);
            });

            image.exists()
                .then(exists => exists ? resolve(image) : setTimeout(() => resolve(image), 10000))
                .catch(e => reject(e));
        });
    }

    // can be sync on startup
    getCSS() {
        const dir = fs.readdirSync('../frontend/dist/css');
        const files = dir.filter(i => i.match(/^(.*?)(?=\.css)/));
        const data = {};
        files.forEach(f => {
            const baseName = f.split('-')[0];
            data[baseName] = f;
        })
        return data;
    }

    // can be sync on startup
    getJS() {
        const dir = fs.readdirSync('../frontend/dist/js');
        const files = dir.filter(i => i.match(/^(.*?)(?=\.js)/));
        const data = {};
        files.forEach(f => {
            const baseName = f.split('-')[0].toLowerCase();
            data[baseName] = f;
        })
        return data;
    }

    //
    getCSSPlain() {
        const data = {};
        Object.keys(this.css).forEach((baseName) => {
            data[baseName] = fs.readFileSync(`./static/css/${this.css[baseName]}`).toString();
        });
        return data;
    }

    getJSPlain() {
        const data = {};
        Object.keys(this.js).forEach((baseName) => {
            data[baseName] = fs.readFileSync(`./static/js/${this.js[baseName]}`).toString();
        });
        return data;
    }

    // @TODO failsafe
    generatePDF(sourceUrl) {
        return this.pdf.generate(sourceUrl);
    }
}