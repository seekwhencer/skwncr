import {ServicesSectionTemplate} from '../../Templates/index.js';
import Section from "../Section.js";

export default class ServicesSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = ServicesSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.services;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            services: this.data,
            sectionFooter: this.sectionFooter,
            ...options
        });
        return this.dom;
    }
}
