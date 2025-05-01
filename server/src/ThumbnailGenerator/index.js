import ThumbnailGeneratorQueue from "./Queue.js";

export default class ThumbnailGenerator {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.thumbnailsRootPath = '/app/';
        this.queue = new ThumbnailGeneratorQueue(this);
    }

    add(image) {
        return this.queue.add(image);
    }
}