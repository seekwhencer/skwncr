import SectionComponent from "./SectionComponent.js";
import Project from "../projects/ProjectComponent.js"
import ProjectStopper from "../../templates/Elements/ProjectStopper.html?raw";
import Swiper from "swiper";

export default class ProjectsSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=projects]');

        // details element
        this.detailsElement = this.element.querySelector('[data-details]');

        // projects
        this.createProjects();
        this.drawProjects();

        // project stopper
        this.projectStopperElement = this.element.querySelector('[data-stopper]');
        this.projectStopper = ProjectStopper.dom({
            icons: this.app.icons
        });
        this.projectStopperElement.replaceWith(this.projectStopper);
    }

    createProjects() {
        this.projects = [];
        const projectElements = this.element.querySelectorAll('.project');
        projectElements.forEach(p => this.projects.push(new Project(this, p)));
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
        let projectsElement, projectElement, projectName, project;

        projectsElement = target.closest('.projects') || target.querySelector('.projects');

        if (projectsElement)
            projectElement = target.closest('.project');

        if (projectElement)
            projectName = projectElement.querySelector('.name').innerText.trim(); //@TODO it's dirty

        if (projectName)
            this.project = this.one(projectName, 'title');

        //console.log(this.project, projectElement, projectName);

        // when clicked on a slider or listing item
        if (this.project)
            this.open(this.project);

        // when not the listing or slider item, and not the details was clicked
        const detailsElement = target.closest('.details');
        if (!this.project && !detailsElement)
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
        this.projects.forEach(p => p.deactivate());
        this.flushDetails();
        this.project = false;
    }

    flushDetails() {
        if (this.project) {
            this.project.flushDetails();
        } else {
            this.detailsElement.innerHTML = '';
        }

    }

    open(project) {
        //if (!this.slider) {
        setTimeout(() => this.parent.header.scrollTo(this.element.dataset.section), 10);
        //}

        setTimeout(() => {
            this.element.classList.add('open');
            project.open();

            if (!this.slider) {
                this.slider = new Swiper('[data-section=projects] .container', {
                    slidesPerView: 2,
                    wrapperClass: 'projects',
                    slideClass: 'project',
                    createElements: true,
                    centeredSlides: true,
                    spaceBetween: '20px',
                    mousewheel: {
                        forceToAxis: true,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 3,
                            spaceBetween: "20px"
                        },
                        1024: {
                            slidesPerView: 8,
                            spaceBetween: "20px"
                        }
                    }
                });
            }

            if (this.slider) {
                this.slider.slideTo(project.index, 600, () => {
                });
            }

        }, 0);
    }

    close() {
        this.flush();
        this.element.classList.remove('open');

        if (this.slider) {
            this.slider.destroy();
            delete this.slider;
        }
        this.parent.header.scrollTo(this.element.dataset.section);
    }
}