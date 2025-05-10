import {PersonSectionTemplate} from '../../Templates/index.js';
import Section from "../Section.js";

export default class PersonSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = PersonSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.person;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            age: this.calcAge(),
            sectionFooter: this.sectionFooter,
            ...this.data,
            ...options
        });
        return this.dom;
    }

    calcAge() {
        const bdArr = this.data.birthDay.split('.');
        const dob = new Date(bdArr[2], bdArr[1], bdArr[0]);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
}
