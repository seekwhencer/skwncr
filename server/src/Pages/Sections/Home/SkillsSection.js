import {SkillsSectionTemplate} from '../../Templates/index.js';
import Section from "../Section.js";

export default class SkillsSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = SkillsSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.skills;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            skills: this.data,
            slashImage: '',
            sectionFooter: this.sectionFooter,
            ...options
        });
        return this.dom;
    }
}
