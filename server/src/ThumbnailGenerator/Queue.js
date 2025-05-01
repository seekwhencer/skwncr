import ThumbnailGeneratorJob from "./Job.js";

export default class ThumbnailGeneratorQueue {
    constructor(parent, options) {
        this.parent = parent;
        this.generator = this.parent;
        this.label = 'THUMBNAIL GENERATOR QUEUE';

        this.data = new Proxy({}, {
            get: (target, prop, receiver) => {
                return target[prop] || false;
            },
            set: (target, prop, val) => {
                target[prop] = val;
                return true;
            },
            deleteProperty(target, key) {
                if (!(key in target)) {
                    return false;
                }
                return target.removeItem(key);
            },
        });
    }

    add(image) {
        console.log(this.label, 'ADDING', image.hash);
        this.data[image.hash] = new ThumbnailGeneratorJob(this, image);
        this.data[image.hash].run();
    }

    remove(image) {
        delete this.data[image.hash];
    }
}