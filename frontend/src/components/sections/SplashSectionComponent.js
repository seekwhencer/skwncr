import VideoSelectionComponent from "../splash/VideoSelectionComponent.js";
import SectionComponent from "./SectionComponent.js";

export default class SplashSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);
        this.debug = false;

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=splash]');

        // typo
        this.title = this.element.querySelector('h1');
        this.subTitle = this.element.querySelector('.subtitle');
        this.scrollMax = this.element.getBoundingClientRect().height;

        // video @TODO from data json
        this.video = new VideoSelectionComponent(this);

        // download pdf
        this.downloadButton = this.element.querySelector('[data-cta-download]');
        this.downloadButton.onclick = (event) => this.clickDownload(event);

        // scroll event
        window.addEventListener("scroll", (event) => this.onScroll(event));

        // ... the section
        this.on('enter', () => this.enterView());
        this.on('leave', () => this.leaveView());
    }

    onScroll(e) {
        //if (!this.app.isDesktop)
        //    return;

        this.scroll = window.scrollY;
        this.scale = 1 / this.scrollMax * this.scroll;

        this.title.css()
            .filter(`blur(${this.scale * 20}px)`)
            .letterSpacing(`${this.scale * 0.5}em`)
            .transform(`translateY(${this.scale * (this.scrollMax / 2)}px)`);

        this.subTitle.css()
            .filter(`blur(${this.scale * 20}px)`)
            .letterSpacing(`${this.scale}em`)
            .transform(`translateY(${this.scale * (this.scrollMax / 2)}px)`);

        if (this.scale >= 0 && this.scale <= 1) {
            this.element.classList.add('splash');
        } else {
            this.element.classList.remove('splash');
        }
    }

    randomVideo() {
        this.video.randomVideo();
    }

    clickDownload(e) {
        e.preventDefault();

        const block = e.target.closest('.cta');
        block.classList.toggle('open');

        console.log(block);

    }

}
