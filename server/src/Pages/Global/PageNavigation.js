import Page from '../../Page.js';
import {PageNavigationTemplate} from '../Templates/index.js';

export default class PageNavigation extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = PageNavigationTemplate;
    }

    html(options = {}) {

        const htmlOptions = {
            ...this.headerMeta,
            ...options,
            icon: this.parent.icons.bot
        };

        this.dom = this.render(this.template, htmlOptions);
        return this.dom;
    }
}
