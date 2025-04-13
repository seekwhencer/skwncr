import Component from "./Component.js";
import ServicesTemplate from "../templates/ServicesTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class ServicesComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = ServicesTemplate.dom({
            services: _DATA.services,
            icons: this.app.icons
        });

        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }
}