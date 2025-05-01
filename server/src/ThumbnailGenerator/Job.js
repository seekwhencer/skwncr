export default class ThumbnailGeneratorJob {
    constructor(parent, image) {
        this.image = image;
    }

    run() {
        return this.image.generateThumbnail();
    }
}