import GeneratorImage from '../ThumbnailGenerator/Image.js';
import StorageImageSizes from "./StorageImageSizes.js";

export default class StorageImage {

    constructor(parent, options) {
        this.imagesRootPath = "/app/server/static/images";
        this.thumbnailsRootPath = '/app/server/static/images/thumbs';
        this.availableImageFolders = ['', 'projects'];
        this.availableExtensions = ['jpg', 'jpeg', 'png'];
        this.sizes = StorageImageSizes;
    }

    /**
     *
     * @param fileName
     * @param folderName
     * @param query
     * @returns {Promise}
     */
    exists(fileName, folderName, query) {
        return new Promise((resolve, reject) => {
            if (!this.availableImageFolders.includes(folderName))
                reject('FOLDER NOT ALLOWED');

            const imageSize = `${query ? query?.s ? query?.s : 'o' : ''}`.toLowerCase();
            if (!Object.keys(this.sizes).includes(imageSize))
                reject('SIZE NOT ALLOWED:', imageSize);

            const image = new GeneratorImage(this, {
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

}