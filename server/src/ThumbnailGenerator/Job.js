export default class ThumbnailGeneratorJob {
    constructor(parent, image) {
        this.image = image;
        this.label = 'QUERY JOB';
    }

    run() {
        console.log(this.label, this.image.name);
        return this.image.generateThumbnail();
    }
}