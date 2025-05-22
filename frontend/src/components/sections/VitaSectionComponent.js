import SectionComponent from "./SectionComponent.js";

export default class VitaSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);
        this.debug = true;

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=vita]');

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

        this.on('enter', () => this.enterView());
        this.on('leave', () => this.leaveView());
    }
}