import {VitaSectionTemplate} from '../../Templates/index.js';
import Section from "../Section.js";

export default class VitaSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = VitaSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.vita;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            vita: this.data,
            sectionFooter: this.sectionFooter,
            ...options
        });
        return this.dom;
    }
}
