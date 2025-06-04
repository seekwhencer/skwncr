import fs from 'fs-extra';
import {spawn} from 'child_process';
import Crypto from 'crypto';
import Image from './ThumbnailGenerator/Image.js';
import Data from '../../data/data.json' with {type: 'json'};

export default class Storage {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.label = 'STORAGE';

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

        //
        this.pdfSourceUrl = `http://localhost:${this.server.port}/print`;
        this.pdfFilePath = '/app/server/static';

        // the bundle hash
        this.css = this.getCSS();
        this.js = this.getJS();

        // the file content
        this.cssPlain = this.getCSSPlain();
        this.jsPlain = this.getJSPlain();

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
        !sourceUrl ? sourceUrl = this.pdfSourceUrl : null;

        return new Promise((resolve, reject) => {
            const hash = `${Crypto.createHash('md5').update(sourceUrl).digest("hex")}`;
            const pdfRealPath = `${this.pdfFilePath}/${hash}.pdf`;
            const processOptions = ['--headless', '--no-pdf-header-footer', '--no-sandbox', '--disable-gpu', '--disable-pdf-tagging', `--print-to-pdf=${pdfRealPath}`, `${sourceUrl}`];
            console.log(processOptions.join(' '));
            this.pdfProcess = spawn('chromium', processOptions);
            this.pdfProcess.on('exit', () => resolve(this.pdfFile(sourceUrl)));
            this.pdfProcess.stderr.on('data', chunk => console.log('>>>', chunk.toString()));
        });
    }

    pdfFile(sourceUrl) {
        const hash = `${Crypto.createHash('md5').update(sourceUrl).digest("hex")}`;
        const pdfRealPath = `${this.pdfFilePath}/${hash}.pdf`;
        return fs.readFileSync(`${pdfRealPath}`);
    }
}