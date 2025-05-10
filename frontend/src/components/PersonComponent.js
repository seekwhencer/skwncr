import Component from "./Component.js";
import FaceImageElement from "./person/FaceImage.js";
import PersonTemplate from "../templates/PersonTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class PersonComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.debug = false;

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=person]');
/*
        this.element = PersonTemplate.dom({
            ..._DATA.person,
            age: this.calcAge(),
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // footer element
        //this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        //this.sectionFooterElement = SectionFooterElement.dom({});
        //this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
*/
        // the face image
        this.faceImage = new FaceImageElement(this);


        this.on('enter', () => this.enterView());
        this.on('leave', () => this.leaveView());
    }

   calcAge() {
        const bdArr = _DATA.person.birthDay.split('.');
        const dob = new Date(bdArr[2], bdArr[1], bdArr[0]);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
}

