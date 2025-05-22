import Component from "./Component.js";

export default class HeaderComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('header');

        // add scroll event for text effect
        window.addEventListener("scroll", (event) => this.onScroll(event))

        // the buttons
        this.buttons = this.element.querySelectorAll('[data-scroll-target]');
        this.buttons.forEach(button => button.onclick = (e) => this.scrollTo(button.dataset.scrollTarget, e));

        this.burgerElement = this.element.querySelector('[data-burger]');
        this.burgerElement.onclick = () => {
            this.element.classList.toggle('open');
        }

        // debouncing
        this.debounceScroll = false;

        //
        this.setUrlTimer = false;

        //
        window.history.scrollRestoration = "manual";

        // on history.go()
        window.addEventListener('popstate', (e) => {
            e.preventDefault();
            const to = window.location.pathname.replace(/\//g, '');
            let section;
            try {
                section = this.parent.element.querySelector(`section[data-url-path=${to}]`).dataset.section;
            } catch (err) {
                section = 'splash';
            }
            this.scrollTo(section);
        });
    }

    onScroll(e) {
        // it is a nice hack: place the scroll offset as value in the css
        document.body.style.setProperty('--scroll', this.scrollPercent);


        //if (!this.app.isDesktop)
        //    return;

        this.debounceScroll ? clearTimeout(this.debounceScroll) : null;
        this.debounceScroll = setTimeout(() => this.setActiveButton(), 10);

        this.scrollMax = this.parent.splash.element.getBoundingClientRect().height;
        this.scroll = this.app.scroll = window.scrollY;
        this.scrollPercent = this.app.scrollPercent = this.scroll / (document.body.offsetHeight - window.innerHeight);
        this.scale = 1 / this.scrollMax * this.scroll;

        if (this.scale >= 0 && this.scale <= 0.8) {
            this.element.classList.add('splash');
            this.element.classList.remove('open');
            this.element.css()
                .filter(`blur(${this.scale * 20}px)`)
                .transform(`translateY(-${this.scale * (1500)}px)`)
                .transition(`none`)
                .opacity(1 - this.scale);
        } else {
            this.element.classList.remove('splash');
            this.element.style = '';
        }

        //console.log(this.scrollPercent, this.scroll);
    }

    scrollTo(targetName, e) {
        if (e)
            e.preventDefault();

        const target = document.querySelector(`[data-section=${targetName}]`);
        const height = parseInt(this.element.css().height().replace('px', ''));
        let offset = target.offsetTop - height;

        this.element.classList.remove('open');

        if (this.app.isMobile) {
            offset = target.offsetTop;
        }

        window.scrollTo({
            top: offset,
            behavior: "smooth"
        });

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
                this.activeSection = section.dataset.section;
                section.classList.add('active');
                button.classList.add('active');
            } else {
                section.classList.remove('active');
                button.classList.remove('active');
            }
        });

        if (this.setUrlTimer)
            clearTimeout(this.setUrlTimer);

        this.setUrlTimer = setTimeout(() => this.setUrl(), 400);
    }

    setUrl() {
        const button = this.element.querySelector(`[data-scroll-target=${this.activeSection}]`);
        const urlPath = button.href;

        if (window.location.href === urlPath)
            return;

        window.history.pushState({}, '', urlPath);
    }

    get activeSection() {
        return this._activeSection;
    }

    set activeSection(val) {
        this._activeSection = val;
    }
}