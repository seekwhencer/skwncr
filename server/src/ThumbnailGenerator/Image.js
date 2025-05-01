import fs from 'fs-extra';
import Crypto from 'crypto';
import ImageMagick from './ImageMagick.js';

export default class Image {
    constructor(parent, options) {
        this.parent = parent;
        this.label = 'IMAGE';

        this.imagesRootPath = this.parent.imagesRootPath || "/app/server/static/images";
        this.thumbnailsRootPath = this.parent.thumbnailsRootPath || '/app/server/static/images/thumbs';
        this.availableImageFolders = this.parent.availableImageFolders || ['projects'];

        this.sizes = this.parent.sizes;
        this.name = options.fileName;
        this.folder = options.folderName;
        this.size = options.imageSize;

        this.baseName = this.name.split('.')[0];
        this.extension = this.name.split('.')[1];
        this.path = `${this.imagesRootPath}/${this.folder}`;
        this.realPath = `${this.path}/${this.name}`;

        this.hashSeed = `${this.folder}/${this.baseName}_s_${this.size}`;
        this.hash = Crypto.createHash('md5').update(this.hashSeed).digest("hex");
        this.thumbnailPath = `${this.thumbnailsRootPath}/${this.folder}`;
        this.thumbnailRealPath = `${this.thumbnailPath}/${this.hash}.${this.extension}`;

        this.thumbnailX = this.sizes[this.size].w;
        this.thumbnailY = this.sizes[this.size].h;

        this.imagemagickSizeString = `${this.thumbnailX}x${this.thumbnailY}`;
        this.quality = 90;

        console.log('NEW IMAGE INSTANCE', this.name, this.folder, this.size);

    }

    /*
    @returns {Promise}<boolean>
     */
    exists() {
        return new Promise((resolve, reject) => {

            this
                .originalExists()
                .then(exists => {
                    if (exists === true) {
                        return this.thumbnailExists();
                    } else {
                        reject('ORIGINAL NOT EXISTS')
                    }
                })
                .then(exists => {
                    if (exists === false) {
                        return this.generateThumbnail();
                    } else {
                        resolve(true);
                    }
                })
                .then(ok => resolve(true));
        });
    }

    /*
    @returns {Promise}<boolean>
     */
    originalExists() {
        return fs.pathExists(this.realPath);
    }

    /*
    @returns {Promise}<boolean>
     */
    thumbnailExists() {
        return fs.pathExists(this.thumbnailRealPath);
    }

    /*
    @returns {Promise}<boolean>
     */
    generateThumbnail() {
        return new Promise((resolve, reject) => {
            console.log(this.label, 'GENERATING THUMB', this.realPath);

            fs.mkdirpSync(this.thumbnailPath);

            // original size, copy the file into the thumb storage
            if (this.size === 'o') {
                console.log(this.label, 'COPYING ORIGINAL', this.realPath);
                fs.copy(this.realPath, this.thumbnailRealPath);
                resolve(true);
            }

            // all other sizes
            if (this.size !== 'o') {
                console.log(this.label, 'SIZE', this.size, this.realPath);

                const read = fs.createReadStream(this.realPath);
                const write = fs.createWriteStream(this.thumbnailRealPath);

                write.on('finish', () => resolve(true));
                write.on('error', e => reject(e));

                const resize = ImageMagick().resize(this.imagemagickSizeString).quality(this.quality);
                read.pipe(resize).pipe(write);
            }
        });
    }


}