import Page from '../../Page.js';
import {DocumentHeaderTemplate} from '../Templates/index.js';

export default class DocumentHeader extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = DocumentHeaderTemplate;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            ...this.headerMeta,
            ...options,
        });
        return this.dom;
    }
}
