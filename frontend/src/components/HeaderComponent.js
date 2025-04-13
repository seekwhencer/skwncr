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
        window.addEventListener("scroll", (event) => this.onScroll(event));
    }

    onScroll(e) {
        this.scrollMax = this.parent.splash.element.getBoundingClientRect().height;
        this.scroll = window.scrollY;
        this.scale = 1 / this.scrollMax * this.scroll;

        if (this.scale >= 0 && this.scale <= 1) {
            this.element.classList.add('splash');
            this.element.css()
                .filter(`blur(${this.scale * 20}px)`)
                .transform(`translateY(-${this.scale * (this.scrollMax)}px)`)
                .transition(`none`)
                .opacity(1-this.scale);
        } else {
            this.element.classList.remove('splash');
            this.element.style = '';
        }
    }
}