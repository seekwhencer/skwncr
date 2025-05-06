import Page from '../../Page.js';
import {PageHeaderTemplate} from '../Templates/index.js';

export default class PageHeader extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = PageHeaderTemplate;
    }

    html() {
        this.dom = this.markup(this.template, {...this.headerMeta});
        return this.dom;
    }
}