import Component from "./Component.js";
import HeaderTemplate from "../templates/HeaderTemplate.html?raw";

export default class HeaderComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = HeaderTemplate.dom({
            data: _DATA,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // add scroll event for text effect
        window.addEventListener("scroll", (event) => this.onScroll(event));

        // the buttons
        this.buttons = this.element.querySelectorAll('[data-scroll-target]');
        this.buttons.forEach(button => button.onclick = () => this.scrollTo(button.dataset.scrollTarget));

        // debouncing
        this.debounceScroll = false;

    }

    onScroll(e) {
        this.debounceScroll ? clearTimeout(this.debounceScroll) : null;
        this.debounceScroll = setTimeout(() => this.active(), 10);

        this.scrollMax = this.parent.splash.element.getBoundingClientRect().height;
        this.scroll = window.scrollY;
        this.scale = 1 / this.scrollMax * this.scroll;

        if (this.scale >= 0 && this.scale <= 0.8) {
            this.element.classList.add('splash');
            this.element.css()
                .filter(`blur(${this.scale * 20}px)`)
                .transform(`translateY(-${this.scale * (200)}px)`)
                .transition(`none`)
                .opacity(1 - this.scale);
        } else {
            this.element.classList.remove('splash');
            this.element.style = '';
        }
    }

    scrollTo(targetName) {
        const target = document.querySelector(`[data-section=${targetName}]`);
        target.scrollIntoView({
            behavior: "smooth"
        });
    }

    active() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const offset = parseInt(section.css().scrollMarginTop().replace('px',''));
            const height = rect.height;
            const rTop = rect.top;
            const top = section.offsetTop;
            const end = (top + height - offset);
            const button = this.element.querySelector(`[data-scroll-target=${section.dataset.section}]`);

            if (rTop < offset && this.scroll < end) {
                section.classList.add('active');
                button.classList.add('active');
            } else {
                section.classList.remove('active');
                button.classList.remove('active');
            }
        });
    }
}