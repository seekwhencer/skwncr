import Component from "../Component.js";
import ProjectTemplate from "../../templates/Elements/ProjectTemplate.html?raw";

export default class ProjectComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.target = this.parent;
    }

    draw() {
        this.element = ProjectTemplate.dom({
           ...this.options,
            highlight: this.options.highlight || false,
            icons: this.app.icons
        });
        this.target.projectsElement.append(this.element);
    }
}