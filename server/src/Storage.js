import fs from 'fs-extra';
import Image from './ThumbnailGenerator/Image.js';

export default class Storage {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.label = 'STORAGE';

        this.imagesRootPath = "/app/server/static/images";
        this.thumbnailsRootPath = '/app/server/static/images/thumbs';
        this.availableImageFolders = ['projects'];
        this.availableExtensions = ['jpg','jpeg','png'];
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

            image.on('thumbnail-finished', () => {
                resolve(image);
            });

            image.exists()
                .then(exists => exists ? resolve(image) : setTimeout(() => resolve(image), 10000))
                .catch(e => reject(e));
        });
    }
}