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
        window.addEventListener("scroll", (event) => this.onScroll(event))

        // the buttons
        this.buttons = this.element.querySelectorAll('[data-scroll-target]');
        this.buttons.forEach(button => button.onclick = (e) => this.scrollTo(button.dataset.scrollTarget));

        // impress button
        this.element.querySelector('[data-fixed-target=impress]').onclick = () => this.app.disclaimer.toggle();

        // debouncing
        this.debounceScroll = false;

    }

    onScroll(e) {
        //if (!this.app.isDesktop)
        //    return;

        this.debounceScroll ? clearTimeout(this.debounceScroll) : null;
        this.debounceScroll = setTimeout(() => this.setActiveButton(), 10);

        this.scrollMax = this.parent.splash.element.getBoundingClientRect().height;
        this.scroll = window.scrollY;
        this.scale = 1 / this.scrollMax * this.scroll;

        if (this.scale >= 0 && this.scale <= 0.8) {
            this.element.classList.add('splash');
            this.element.css()
                .filter(`blur(${this.scale * 20}px)`)
                .transform(`translateY(-${this.scale * (1500)}px)`)
                .transition(`none`)
                .opacity(1 - this.scale);
        } else {
            this.element.classList.remove('splash');
            this.element.style = '';
        }
    }

    scrollTo(targetName) {
        const target = document.querySelector(`[data-section=${targetName}]`);
        const height = parseInt(this.element.css().height().replace('px',''));

        window.scrollTo({
            top: target.offsetTop - height,
            behavior: "smooth"
        });

        /*target.scrollIntoView({
            behavior: "smooth",
            inline: "nearest",
            block: "start"
        });*/

        if (target.dataset.section === 'splash')
            this.app.splash.randomVideo();
    }

    setActiveButton() {
        const sections = document.querySelectorAll('section[data-scroll]');
        sections.forEach(section => {
            const gap = 200;
            const rect = section.getBoundingClientRect();
            const offset = parseInt(section.css().scrollMarginTop().replace('px', ''));
            const height = parseInt(rect.height);
            const rTop = parseInt(rect.top);
            const top = parseInt(section.offsetTop);
            const end = top + height - offset - gap;
            const button = this.element.querySelector(`[data-scroll-target=${section.dataset.section}]`);

            //console.log('>>>', parseInt(this.scroll), section.dataset.section.padEnd(10, '.'), rTop, offset, end, (rTop < offset), this.scroll < end);

            if (rTop <= offset && this.scroll < end) {
                section.classList.add('active');
                button.classList.add('active');
            } else {
                section.classList.remove('active');
                button.classList.remove('active');
            }
        });
    }
}