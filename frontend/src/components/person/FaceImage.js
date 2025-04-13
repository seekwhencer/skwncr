import Component from "../Component.js";

export default class FaceImageElement extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.text = this.parent.element.querySelector('.text');
        this.element = this.parent.element.querySelector('.image');
        this.image = this.element.querySelector('img');
        window.window.addEventListener("scroll", (e) => this.onScroll(e));

        this.textHeight = this.text.getBoundingClientRect().height;
    }

    onScroll(e) {
        this.scroll = window.scrollY;
        this.offsetTop = this.scroll - this.parent.element.offsetTop;
        this.top = this.parent.element.clientTop;

        const shift = 200; // start before
        const length = this.textHeight; // scroll length
        const translate = this.offsetTop + shift;
        const scale = 1 - (translate / 1000000 * (length));

        if (this.offsetTop > (-shift) && this.offsetTop < (length+shift)) {
            this.element.css()
                .transform(`translateY(${(translate * 0.5)}px)`)
                .opacity(scale);
        } else {
            this.element.css()
                .transform(`translateY(0)`)
                .opacity(1);
        }
    }
}
