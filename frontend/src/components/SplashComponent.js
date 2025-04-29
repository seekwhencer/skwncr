import Component from "./Component.js";
import SplashTemplate from "../templates/SplashTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.debug = false;

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = SplashTemplate.dom({
            splash: _DATA.intro,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // typo
        this.title = this.element.querySelector('h1');
        this.subTitle = this.element.querySelector('.subtitle');
        this.scrollMax = this.element.getBoundingClientRect().height;

        // video @TODO from data json
        this.videoSources = _DATA.intro.videos;
        this.video = this.element.querySelector('video');
        this.randomVideo();

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);

        window.addEventListener("scroll", (event) => this.onScroll(event));

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

    /**
     * little recursion to suppress doubles
     */
    randomVideo() {
        if (!this.app.isDesktop)
            return;

        const r = () => {
            const rand = Math.floor(Math.random() * this.videoSources.length);
            if (this.video.src.includes(this.videoSources[rand]))
                return r();

            return rand;
        }
        this.video.src = this.videoSources[r()];
    }
}
