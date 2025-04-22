import Component from "./Component.js";
import SkillsTemplate from "../templates/SkillsTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = SkillsTemplate.dom({
            skills: _DATA.skills,
            slashImage: 'IMAGE',
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        //
        this.element.querySelectorAll('.skill').forEach(s => s.onclick = () => s.classList.toggle('like'));

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }
}