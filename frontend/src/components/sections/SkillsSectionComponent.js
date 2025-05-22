import SectionComponent from "./SectionComponent.js";

export default class SkillsSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=skills]');

        //
        this.element.querySelectorAll('.skill').forEach(s => s.onclick = () => s.classList.toggle('like'));
    }
}