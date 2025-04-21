import Component from "./Component.js";
import Project from "./projects/ProjectComponent.js"
import ProjectsTemplate from "../templates/ProjectsTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";
import ProjectStopper from "../templates/Elements/ProjectStopper.html?raw";
import Swiper from "swiper";

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
        //@ TODO as Proxy()
        this.projects = [];
        _DATA.projects.listing.forEach(p => this.projects.push(new Project(this, p)));

        this.element.onclick = (e) => this.click(e);
    }

    drawProjects() {
        this.projectsElement = this.element.querySelector('[data-projects]');
        this.projects.forEach(project => project.draw());
    }

    click(e) {
        if (!e)
            return;

        if (e.target === undefined)
            return;

        const target = e.target;
        let projectElement, projectName, project;

        this.projectsElement = target.closest('.projects') || target.querySelector('.projects');

        if (this.projectsElement)
            projectElement = target.closest('.project');

        if (projectElement)
            projectName = projectElement.querySelector('.name').innerText.trim(); //@TODO it's dirty

        if (projectName)
            project = this.one(projectName, 'title');

        if (project)
            this.open(project);

        if (!project)
            this.close();
    }

    one() {
        const args = Array.from(arguments);

        if (args[0] === undefined)
            return;

        let key = 'title', value, project;

        if (args.length === 2) {
            value = args[0];
            key = args[1];
        }

        if (args.length === 1)
            value = args[0];

        if (value === 'undefined')
            return;

        project = this.projects.filter(p => p.options[key] === value ? p : null)[0]

        if (project)
            return project;

        return false;

    }

    flush() {
        this.projects.forEach(p => p.element.classList.remove('active'));
    }

    open(project) {

        setTimeout(() => this.parent.header.scrollTo(this.element.dataset.section),0);
        project.open();
        this.element.classList.add('open');

        if (!this.slider) {
            this.slider = new Swiper('[data-section=projects] .container', {
                slidesPerView: 6,
                wrapperClass: 'projects',
                slideClass: 'project',
                createElements: true,
                centeredSlidesBounds: true,
                centeredSlides: true,
                spaceBetween: '20px',
                mousewheel: {
                    forceToAxis: true,
                },
            });
        }
        this.slider.slideTo(project.index, 600, () => {});
    }

    close() {
        console.log('>>> CLOSE MODAL');
        this.flush();
        this.element.classList.remove('open');
        this.slider.destroy();
        delete this.slider;
    }
}