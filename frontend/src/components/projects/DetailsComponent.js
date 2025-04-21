import Component from "../Component.js";
import ProjectDetailsTemplate from "../../templates/Elements/ProjectDetailsTemplate.html?raw";

export default class ProjectDetailsComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.target = this.parent;
        this.detailsElement = this.target.detailsElement;
    }

    draw() {
        this.element = ProjectDetailsTemplate.dom({
            ...this.options,
            images: this.options?.images || [],
            skills: this.options?.skills || [],
            description_long: this.options?.description_long || '',
            highlight: this.options.highlight || false,
            icons: this.app.icons
        });
        this.detailsElement.append(this.element);
        setTimeout(() => this.element.classList.remove('hidden'), 10);
    }

    destroy() {
        delete this.parent.details;
    }

}