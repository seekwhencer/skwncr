import fs from 'fs-extra';
import Image from '../ThumbnailGenerator/Image.js';

import StoragePDF from "./StoragePDF.js";
import StorageData from "./StorageData.js";
import StorageCSS from "./StorageCSS.js";
import StorageJS from "./StorageJS.js";

export default class Storage {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.label = 'STORAGE';
        this.debug = false;

        // in memory
        this.data = new StorageData(this, {silent: false});

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

        // get the bundles index and read the data
        // of all available bundles into the memory
        this.getBundlesSync();

        // the pdf generator
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

    /**
     * get the folder (css and js) lists and
     * read all existing files into memory
     */
    getBundlesSync() {
        this.css = new StorageCSS(this, {});
        this.js = new StorageJS(this, {});

        this.cssPlain = this.css.plain;
        this.jsPlain = this.js.plain;
    }

    // wrapper pdf generator
    generatePDF(sourceUrl) {
        return this.pdf.generate(sourceUrl);
    }
}