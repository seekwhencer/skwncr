import StoragePDF from "./StoragePDF.js";
import StorageData from "./StorageData.js";
import StorageCSS from "./StorageCSS.js";
import StorageJS from "./StorageJS.js";
import StorageImage from "./StorageImage.js";

export default class Storage {
    constructor(parent) {
        this.parent = parent;
        this.server = this.parent;
        this.label = 'STORAGE';
        this.debug = false;

        // in memory
        this.data = new StorageData(this, {silent: false});

        // images
        this.image = new StorageImage(this, {});

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
        return this.image.exists(fileName, folderName, query);
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