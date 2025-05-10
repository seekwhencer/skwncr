import Component from "../Component.js";
import ProjectTemplate from "../../templates/Elements/ProjectTemplate.html?raw";
import ProjectDetailsComponent from "./DetailsComponent.js";

export default class ProjectComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.target = this.parent;
        this.detailsElement = this.parent.detailsElement;
        this.element = options;
        this.options.title = this.element.querySelector('.name').innerText;
    }

    draw() {

/*
        this.element = ProjectTemplate.dom({
            ...this.options,
            images: this.options?.images || [],
            highlight: this.options.highlight || false,
            icons: this.app.icons
        });
        this.target.projectsElement.append(this.element);
*/
        // lazy loading
        this.imageSet = this.element.querySelector('picture');
        if (this.imageSet) {
            this.image = this.imageSet.querySelector('img');
            this.image.onload = () => console.log(this.image.dataset.src, 'LOADED');
        }
        this.imageInViewOffsetY = 200;

        this.on('imageEnter', () => this.imageEnterView());
        this.on('imageLeave', () => this.imageLeaveView());

        window.addEventListener('scroll', () => {
            if (!this.image)
                return;

            if (this.isImageInView && this.isImageInView !== this.wasImageInView)
                this.emit('imageEnter');

            if (!this.isImageInView && this.isImageInView !== this.wasImageInView)
                this.emit('imageLeave');

            this.wasImageInView = this.isImageInView;
        });
    }

    drawDetails() {
        this.flushDetails();
        this.getData().then(() => {
            this.details = new ProjectDetailsComponent(this);
            setTimeout(() => this.details.draw(), 300); // delaying the details
        });
    }

    flushDetails() {
        this.details ? this.details.destroy() : null;
        this.detailsElement.innerHTML = '';
    }

    open() {
        this.parent.flush();
        this.activate();
        this.drawDetails();
    }

    close() {
        this.deactivate();
        this.flushDetails();
    }

    activate() {
        this.element.classList.add('active');
    }

    deactivate() {
        this.element.classList.remove('active');
    }

    imageEnterView() {
        if (!this.imageSet)
            return;

        const sources = this.imageSet.querySelectorAll('source');
        sources.forEach(s => s.srcset = s.dataset.src);
    }

    imageLeaveView() {
        //console.log('>> IMAGE LEAVE:', this.image.dataset.src)
    }

    getData() {
        return new Promise((resolve, reject) => {
            return this.fetch(`/data/projects/listing/${this.index}`).then(response => {
                this.data = response;
                resolve('yay');
            });
        });
    }

    get index() {
        return this.parent.projects.indexOf(this);
    }

    set index(val) {
        this._index = val;
    }

    get isImageInView() {
        if (!this.image)
            return;

        let {top, left, bottom, right} = this.image.getBoundingClientRect();
        let {innerHeight, innerWidth} = window;

        top = top - this.imageInViewOffsetY;
        bottom = bottom + this.imageInViewOffsetY;

        return (((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)));
    }

    set isImageInView(val) {
        //
    }
}