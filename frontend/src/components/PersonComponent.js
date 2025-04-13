import Component from "./Component.js";
import PersonTemplate from "../templates/PersonTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class PersonComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = PersonTemplate.dom({
            person: _DATA.person,
            age: this.calcAge(),
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }

   calcAge() {
        const bdArr = _DATA.person.birthDay.split('.');
        const dob = new Date(bdArr[2], bdArr[1], bdArr[0]);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
}

