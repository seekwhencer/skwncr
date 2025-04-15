import Component from "./Component.js";
import ServicesTemplate from "../templates/ServicesTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";
import ServiceDetailComponent from "./service/ServiceDetailComponent.js";

export default class ServicesComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = ServicesTemplate.dom({
            services: _DATA.services,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        // the only one click handler per section
        this.element.onclick = (e) => this.click(e);

        // buttons
        this.buttons = this.element.querySelectorAll('.service:not(.empty)');
        this.buttons.forEach(button => button.onclick = () => this.click(button));

        // the detail element
        this.details = new ServiceDetailComponent(this, {});

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }

    click(e) {
        if (!e)
            return;

        if (e.target === undefined)
            return;

        // the target is any clicked element in this section
        const target = e.target;
        const services = target.closest('.services') || target.querySelector('.services');
        const service = target.closest('.service:not(.empty)');


        /**
         * remove all active classes from services
         */
        const flushAll = () => {
            if (services)
                services.querySelectorAll('.service.active').forEach(el => el.classList.remove('active'));
        }
        /**
         * select one service
         */
        const toggleActiveButton = () => {
            if (service) {
                service.classList.toggle('active');
                this.active = service.dataset.name;
            }
        }

        /**
         * toggle the detail view
         */
        const toggleOpen = () => {
            if (services)
                services.querySelectorAll('.service.active').length > 0 ? this.open() : this.close();

            if (!service)
                this.close();
        }

        // and action
        flushAll(e);
        toggleActiveButton(e);
        toggleOpen(e);
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
        this.details.draw();
    }

    get active() {
        return this._active || false;
    }

    set active(val) {
        this._active = val;
        this.drawDetails();
    }
}