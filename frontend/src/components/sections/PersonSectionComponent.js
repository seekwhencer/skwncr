import FaceImageElement from "../person/PersonFaceImageComponent.js";
import SectionComponent from "./SectionComponent.js";

export default class PersonSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);
        this.debug = false;

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=person]');

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

