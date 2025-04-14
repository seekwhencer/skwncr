import Component from "./Component.js";
import ServicesTemplate from "../templates/ServicesTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class ServicesComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = ServicesTemplate.dom({
            services: _DATA.services,
            icons: this.app.icons
        });
        this.target.element.append(this.element);

        this.element.onclick = (e) => this.click(e);

        // buttons
        this.buttons = this.element.querySelectorAll('.service:not(.empty)');
        this.buttons.forEach(button => button.onclick = () => this.click(button));

        // footer element
        this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        this.sectionFooterElement = SectionFooterElement.dom({});
        this.sectionFooterTarget.replaceWith(this.sectionFooterElement);
    }

    click(e) {
        if (!e)
            return;

        const flushAll = (e) => {
            const services = e.target.closest('.services');
            if (services)
                services.querySelectorAll('.service.active').forEach(el => el.classList.remove('active'));
        }

        const toggleActiveButton = (e) => {
            const service = e.target.closest('.service:not(.empty)');
            if (service)
                service.classList.toggle('active');
        }

        const toggleOpen = (e) => {
            const services = e.target.closest('.services');
            if (services)
                services.querySelectorAll('.service.active').length > 0 ? services.classList.add('open') : services.classList.remove('open');

            if(services.classList.contains('open'))
                this.parent.header.scrollTo(this.element.dataset.section);
        }

        if (e.target === undefined)
            return;

        flushAll(e);
        toggleActiveButton(e);
        toggleOpen(e);

    }

    draw() {

    }
}