import {DisclaimerSectionTemplate} from '../../Templates/index.js';
import Section from "../Section.js";

export default class DisclaimerSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = DisclaimerSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.impress;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            ...this.data,
            icons: this.icons,
            social: this.parent.data.person.social,
            contact: this.parent.data.person.contact,
            dependencies: this.parent.data.config.packages.frontend.dependencies,
            sectionFooter: this.sectionFooter,
            ...options
        });
        return this.dom;
    }
}
