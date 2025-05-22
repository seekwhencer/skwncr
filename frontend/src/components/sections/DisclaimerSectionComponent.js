import SectionComponent from "./SectionComponent.js";

export default class DisclaimerSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=disclaimer]');
    }

    click(e) {
        const target = e.target;

        if (!target)
            return;

        const section = target.closest('section');

        if (!section)
            return;

        if (section.dataset.section === 'disclaimer')
            this.toggle();
    }

    toggle() {
        this.element.classList.toggle('open');
    }
}
