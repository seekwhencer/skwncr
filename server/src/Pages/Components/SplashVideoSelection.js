import {SplashVideoSelectionTemplate} from '../Templates/index.js';
import Page from "../../Page.js";

export default class SplashSection extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = SplashVideoSelectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            ...this.data,
            ...options
        });
        return this.dom;
    }
}
