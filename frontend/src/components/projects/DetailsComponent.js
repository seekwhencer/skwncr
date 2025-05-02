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

        //
        this.imageView = this.element.querySelector('[data-image-large]');

        // thumbnails
        this.images = this.element.querySelectorAll('[data-detail-images] picture');
        this.images.forEach(i => i.onclick = (e) => this.swapImage(e));
    }

    swapImage(e) {
        const target = e.target;
        const filePath = e.target.dataset.source;

        const picture = target.closest('picture');
        const clone = picture.cloneNode(true);
        this.imageView.querySelector('picture').remove();
        this.imageView.append(clone);
    }

    destroy() {
        delete this.parent.details;
    }

}