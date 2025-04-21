import Component from "../Component.js";
import ProjectTemplate from "../../templates/Elements/ProjectTemplate.html?raw";
import ProjectDetailsComponent from "./DetailsComponent.js";

export default class ProjectComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.target = this.parent;
        this.detailsElement = this.parent.detailsElement;
    }

    draw() {
        this.element = ProjectTemplate.dom({
            ...this.options,
            images: this.options?.images || [],
            highlight: this.options.highlight || false,
            icons: this.app.icons
        });
        this.target.projectsElement.append(this.element);
    }

    drawDetails() {
        this.flushDetails();
        this.details = new ProjectDetailsComponent(this, this.options);
        setTimeout(() => this.details.draw(), 300); // delaying the details
    }

    flushDetails() {
        console.log('>>> FLUSH DETAILS', this.details);
        this.details ? this.details.destroy() : null;
        this.detailsElement.innerHTML = '';
    }

    open() {
        this.parent.flush();
        this.element.classList.add('active');
        this.drawDetails();
    }

    close() {
        this.element.classList.remove('active');
        this.flushDetails();
    }

    get index() {
        return this.parent.projects.indexOf(this);
    }

    set index(val) {
        this._index = val;
    }
}