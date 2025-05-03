import fs from 'fs-extra';
import Crypto from 'crypto';
import ImageMagick from './ImageMagick.js';
import Events from "../Events.js";

export default class Image extends Events {
    constructor(parent, options) {
        super(parent, options);

        this.parent = parent;
        this.server = this.parent.server;
        this.label = 'IMAGE';

        this.imagesRootPath = this.parent.imagesRootPath || "/app/server/static/images";
        this.thumbnailsRootPath = this.parent.thumbnailsRootPath || '/app/server/static/images/thumbs';
        this.availableImageFolders = this.parent.availableImageFolders || ['projects'];
        this.availableExtensions = this.parent.availableExtensions;

        this.sizes = this.parent.sizes;

        this.name = options.fileName;
        this.folder = options.folderName === '' ? false : options.folderName;
        this.size = options.imageSize;

        this.baseName = this.name.split('.')[0];
        this.extension = this.name.split('.')[1].toLowerCase();

        this.path = this.folder ? `${this.imagesRootPath}/${this.folder}` : `${this.imagesRootPath}`;
        this.realPath = `${this.path}/${this.name}`;

        this.hashSeed = this.folder ? `${this.folder}/${this.baseName}_s_${this.size}` : `${this.baseName}_s_${this.size}`;
        this.hash = `${Crypto.createHash('md5').update(this.hashSeed).digest("hex")}`;
        this.thumbnailPath = this.folder ? `${this.thumbnailsRootPath}/${this.folder}` : `${this.thumbnailsRootPath}`;
        this.thumbnailRealPath = `${this.thumbnailPath}/${this.hash}.${this.extension}`;

        this.thumbnailX = this.sizes[this.size].w;
        this.thumbnailY = this.sizes[this.size].h;

        this.imagemagickSizeString = `${this.thumbnailX}x${this.thumbnailY}`;
        this.quality = 90;
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
                        reject('CHECK ORIGINAL NOT EXISTS')
                    }
                })
                .then(exists => {
                    if (exists === false) {
                        this.addToQueue();
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                });
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

                write.on('finish', () => this.emit('thumbnail-finished'));
                write.on('error', e => reject(e));

                const resize = ImageMagick().resize(this.imagemagickSizeString).quality(this.quality);
                read.pipe(resize).pipe(write);
            }
        });
    }

    addToQueue() {
        this.server.thumbnailGenerator.add(this);
    }


}