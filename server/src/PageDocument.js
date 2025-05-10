import Page from "./Page.js";
import DocumentHeader from './Pages/Global/DocumentHeader.js';
import DocumentFooter from "./Pages/Global/DocumentFooter.js";

export default class PageDocument extends Page {
    constructor(parent, options) {
        super(parent, options);

        this.server = this.parent;
        this.icons = this.server.icons;
        this.data = this.server.storage.data;

        this.documentHeader = new DocumentHeader(this);
        this.documentFooter = new DocumentFooter(this);
    }
}