import Component from "./Component.js";
import FooterTemplate from "../templates/FooterTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class FooterComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = FooterTemplate.dom({
            text: _DATA.footer.text,
            icons: this.app.icons
        });

        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }
}