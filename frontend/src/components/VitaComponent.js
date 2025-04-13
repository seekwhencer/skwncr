import Component from "./Component.js";
import VitaTemplate from "../templates/VitaTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class VitaComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = VitaTemplate.dom({
            vita: _DATA.vita,
            icons: this.app.icons
        });

        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }
}