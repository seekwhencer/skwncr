import Component from "../Component.js";
import ServiceDetailTemplate from "../../templates/Elements/ServiceDetailTemplate.html?raw";

export default class ServiceDetailComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = this.target.element.querySelector('[data-name=details]');

    }

    open() {
        setTimeout(() => this.draw(), 2000);
    }

    close() {
        this.element.innerHTML = '';
    }

    draw() {
        if (this.parent.active) {
            const service = _DATA.services.filter(s => s.icon === this.parent.active)[0];

            this.element = ServiceDetailTemplate.dom({
                service: service,
                icons: this.app.icons
            });

            this.name = this.element.querySelector('[data-headline]');
            this.text = this.element.querySelector('[data-text]');

            this.target.element.querySelector('[data-name=details]').replaceWith(this.element);
            setTimeout(() => this.element.classList.remove('hidden'), 0); // next tick ;)
        }
    }
}
