import SectionComponent from "./SectionComponent.js";

export default class FooterSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('footer');
    }
}