import Page from '../../Page.js';
import {PageNavigationTemplate} from '../Templates/index.js';

export default class PageNavigation extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = PageNavigationTemplate;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            ...this.headerMeta,
            ...options,
            icon: this.parent.icons.bot
        });
        return this.dom;
    }
}
