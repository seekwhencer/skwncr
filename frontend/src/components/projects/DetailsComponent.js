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

        // the image and the navigation
        this.imageElement = this.element.querySelector('[data-image-large]');
        this.imageSet = this.imageElement.querySelector('picture');
        this.imageSources = this.imageSet.querySelectorAll('source');

        this.imageLarge = this.imageSet.querySelector('img');
        this.imageLarge.onload = () => this.onLoadImage();

        // thumbnails
        this.images = this.element.querySelectorAll('[data-detail-images] picture');
        this.images.forEach(i => i.onclick = (e) => this.swapImage(e));
    }

    swapImage(e) {
        const button = e.target;
        const buttonPicture = button.closest('picture');
        const buttonSources = buttonPicture.querySelectorAll('source');
        const buttonImage = buttonPicture.querySelector('img');
        this.imageElement.classList.add('loading');

        const srcset = ['m','l'];
        buttonSources.forEach((s, i) => this.imageSources[i].srcset = `${buttonImage.dataset.source}?s=${srcset[i]}`);
    }

    onLoadImage() {
        this.imageElement.classList.remove('loading');
        const height = this.imageLarge.css().height();
        this.imageElement.style.height = this.imageLarge.css().height();
    }

    destroy() {
        delete this.parent.details;
    }

}