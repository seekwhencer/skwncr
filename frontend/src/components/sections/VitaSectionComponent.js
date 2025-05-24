import SectionComponent from "./SectionComponent.js";
import VitaBeeSwarmComponent from "../vita/VitaBeeSwarm.js";

export default class VitaSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);
        this.debug = true;

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=vita]');

        //
        window.addEventListener("scroll", (event) => this.onScroll(event));

        // more button
        this.moreElement = this.element.querySelector('[data-more]');
        this.element.querySelector('[data-button-more]').onclick = (e) => {
            this.moreElement.classList.toggle('hidden');
            const span = e.target.closest('button').querySelector('span');
            const icon = e.target.closest('button').querySelector('i');

            if (this.moreElement.classList.contains('hidden')) {
                span.innerHTML = 'mehr';
                icon.innerHTML = this.app.icons.arrowDownLine;
            } else {
                span.innerHTML = 'weniger';
                icon.innerHTML = this.app.icons.arrowUpLine;
            }
            this.onScroll();
        }

        // vita elements
        this.vitas = this.element.querySelectorAll('.vita');

        // bee warm
        this.beeSwarm = new VitaBeeSwarmComponent(this);

        // events
        this.on('enter', () => this.enterView());
        this.on('leave', () => this.leaveView());
    }

    onScroll(e) {
        const offset = 100; // the header
        const box = this.element.getBoundingClientRect();
        const top = window.innerHeight - box.top;
        this.scroll = top / (box.height + window.innerHeight - offset);

        this.element.style.setProperty('--scroll-vita', this.scroll);
        if (this.scroll > 0 && this.scroll < 1) {
            this.element.classList.add('scroll');
        } else {
            this.element.classList.remove('scroll');
        }
        this.vitas.forEach((v, i) => this.calcZenit(v, i));
    }

    calcZenit(vita, index) {
        if (this.scroll === 0 || this.scroll === 1)
            return;

        const offset = 2000;
        const box = vita.getBoundingClientRect();
        const h = 200;
        const top = h - box.top;
        let scale = top / h;
        scale = 1 - scale - 4;

        if (scale < 0)
            scale = 0;

        if (scale > 1)
            scale = 1;

        vita.style.setProperty('--scroll-shift', scale);
    }
}