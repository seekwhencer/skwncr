import Component from "./Component.js";
import Project from "./projects/ProjectComponent.js"
import ProjectsTemplate from "../templates/ProjectsTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";
import ProjectStopper from "../templates/Elements/ProjectStopper.html?raw";

export default class ProjectsComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = ProjectsTemplate.dom({
            text: _DATA.projects.text,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // projects
        this.createProjects();
        this.drawProjects();

        // project stopper
        this.projectStopperElement = this.element.querySelector('[data-stopper]');
        this.projectStopper = ProjectStopper.dom({
            icons: this.app.icons
        });
        this.projectStopperElement.replaceWith(this.projectStopper);

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }

    createProjects() {
        this.projects = [];
        _DATA.projects.listing.forEach(p => this.projects.push(new Project(this, p)));
    }

    drawProjects() {
        this.projectsElement = this.element.querySelector('[data-projects]');
        this.projects.forEach(project => project.draw());
    }

}