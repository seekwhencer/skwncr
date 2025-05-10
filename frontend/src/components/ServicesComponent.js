import Component from "./Component.js";
import ServicesTemplate from "../templates/ServicesTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";
import ServiceDetailComponent from "./service/ServiceDetailComponent.js";
import ServiceComponent from "./service/ServiceComponent.js";

export default class ServicesComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = document.querySelector('[data-section=services]');

        /*
        this.element = ServicesTemplate.dom({
            services: _DATA.services,
            icons: this.app.icons
        });
        this.target.element.append(this.element);
        */

        // the only one click handler per section
        this.element.onclick = (e) => this.click(e);

        // services
        this.services = [];
        this.serviceElements = this.element.querySelectorAll('.service:not(.empty)');
        this.serviceElements.forEach(s => this.services.push(new ServiceComponent(this, s)));

        // the detail element
        this.details = new ServiceDetailComponent(this, {});

        // footer element
        //this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        //this.sectionFooterElement = SectionFooterElement.dom({});
        //this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
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