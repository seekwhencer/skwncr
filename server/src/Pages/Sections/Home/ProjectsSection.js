import {ProjectsSectionTemplate} from '../../Templates/index.js';
import ProjectListingElement from '../../Components/ProjectListingElement.js';
import Section from "../Section.js";

export default class ProjectsSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = ProjectsSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.projects;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            projects: this.createProjects(),
            text: this.data.text,
            sectionFooter: this.sectionFooter,
            ...this.data,
            ...options
        });
        return this.dom;
    }

    createProjects() {
        this.projects = [];
        this.data.listing.forEach(i => this.projects.push(new ProjectListingElement(this, i).html()));
        return this.projects.join('');
    }
}
