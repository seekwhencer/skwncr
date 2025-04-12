import Component from "./Component.js";
import SkillsTemplate from "../templates/SkillsTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = _TD(SkillsTemplate, {
            skills: _DATA.skills,
            slashImage: 'IMAGE',
            icons: this.app.icons
        });

        this.target.element.append(this.element);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = _TD(SectionFooterElement, {});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }
}