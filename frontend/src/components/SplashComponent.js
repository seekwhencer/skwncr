import Component from "./Component.js";
import SplashTemplate from "../templates/SplashTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = SplashTemplate.dom({
            splash: _DATA.intro,
            icons: this.app.icons
        });

        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);

        // console.log('>>>', this.element.css().background() );
    }
}
