import Component from "./Component.js";
import VitaTemplate from "../templates/VitaTemplate.html?raw";
import SectionFooterElement from "../templates/Elements/SectionFooterElement.html?raw";

export default class VitaComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.debug = true;


        this.target = this.options.target ? this.options.target : this.parent;

        this.element = document.querySelector('[data-section=vita]');

        /*
        this.element = VitaTemplate.dom({
            vita: _DATA.vita,
            icons: this.app.icons
        });
        this.target.element.append(this.element);
        */
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
        }

        // footer element
        //this.sectionFooterTarget = this.element.querySelector('[data-element=section-footer]');
        //this.sectionFooterElement = SectionFooterElement.dom({});
        //this.sectionFooterTarget.replaceWith(this.sectionFooterElement);

        this.on('enter', () => this.enterView());
        this.on('leave', () => this.leaveView());
    }
}