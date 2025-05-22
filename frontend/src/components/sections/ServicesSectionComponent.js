import SectionComponent from "./SectionComponent.js";
import ServiceComponent from "../services/ServiceComponent.js";
import ServiceDetailComponent from "../services/ServiceDetailComponent.js";

export default class ServicesSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = document.querySelector('[data-section=services]');

        // the only one click handler per section
        this.element.onclick = (e) => this.click(e);

        // services
        this.services = [];
        this.serviceElements = this.element.querySelectorAll('.service:not(.empty)');
        this.serviceElements.forEach(s => this.services.push(new ServiceComponent(this, s)));

        // the detail element
        this.details = new ServiceDetailComponent(this, {});
    }

    click(e) {
        if (!e)
            return;

        if (e.target === undefined)
            return;

        // the target is any clicked element in this section
        const target = e.target;
        const service = target.closest('.service:not(.empty)');
        let index = false;

        if (service)
            index = [...this.element.querySelectorAll('.service:not(.empty)')].indexOf(service);

        if (index === false) {
            this.close();
        } else {
            this.services[index].select();
        }

    }

    open() {
        this.parent.services.element.querySelector('.services').classList.add('open');
        this.parent.header.scrollTo(this.element.dataset.section);
    }

    close() {
        this.parent.services.element.querySelector('.services').classList.remove('open');
        this.closeDetails();
    }

    openDetails() {
        this.details.open();
    }

    closeDetails() {
        this.active = false;
        this.details.close();
    }

    drawDetails() {
        if (this.details)
            this.details.draw();
    }

    flushAll(index) {
        this.services.forEach((service, i) => i !== index ? service.flush() : null);
    }

    get active() {
        return this._active || false;
    }

    set active(val) {
        this._active = val;
        this.drawDetails();
    }
}