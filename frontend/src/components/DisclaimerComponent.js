import Component from "./Component.js";
import DisclaimerTemplate from "../templates/DisclaimerTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class DisclaimerComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = DisclaimerTemplate.dom({
            ..._DATA.impress,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        //
        this.element.onclick = (e) => this.click(e);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
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
