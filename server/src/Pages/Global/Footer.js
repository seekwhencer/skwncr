import Page from '../../Page.js';
import {PageFooterTemplate} from '../Templates/index.js';

export default class PageFooter extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = PageFooterTemplate;
    }

    html() {
        this.dom = this.markup(this.template, {...this.headerMeta});
        return this.dom;
    }
}