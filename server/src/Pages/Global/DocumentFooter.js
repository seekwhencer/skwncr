import {DocumentFooterTemplate} from '../Templates/index.js';
import Section from "../Sections/Section.js";

export default class DocumentFooter extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = DocumentFooterTemplate;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            text: this.parent.storage.data.footer.text,
            readme: this.parent.storage.data.footer.readme,
            sectionFooter: this.sectionFooter,
            ...options
        });
        return this.dom;
    }
}
