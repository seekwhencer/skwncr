import Events from '../global/Events.js';

export default class Component extends Events {
    constructor(parent, options) {
        super(parent, options);
        this.parent = parent;
        this.app = parent.app;
        this.options = options || {};

        this.wasInView = false;

        /*
        window.addEventListener('scroll', () => {
            if (!this.element)
                return;

            if (this.isInView && this.isInView !== this.wasInView)
                this.emit('enter');

            if (!this.isInView && this.isInView !== this.wasInView)
                this.emit('leave');

            this.wasInView = this.isInView;
        });
         */

    }

    enterView() {
        this.debug ? console.log('>> SECTION ENTER:', this.element.dataset.section) : null;
    }

    leaveView() {
        this.debug ? console.log('>> SECTION LEAVE:', this.element.dataset.section) : null;
    }

    get isInView() {
        if (!this.element)
            return;

        if (!this.element?.dataset?.section)
            return;

        const {top, bottom, height} = this.element.getBoundingClientRect();
        const {innerHeight} = window;
        const offsetHeader = parseInt(this.element.css().scrollMarginTop().replace('px', ''));
        const offsetTop = parseInt(this.element.offsetTop);
        const shiftTop = offsetHeader;
        const shiftBottom = 300;

        this.percentScrolled = -100 / offsetTop * top;

        const is = (offsetTop >= top) && ((top - shiftTop) < innerHeight) && (bottom > shiftBottom);
/*
        this.debug ? console.log('>> IN VIEW', this.element.dataset.section, is,
            `${parseInt(offsetHeader)}`.padEnd(6, '.'),
            `${parseInt(offsetTop)}`.padEnd(6, '.'),
            `${parseInt(this.percentScrolled)}`.padEnd(6, '.'),
            `${parseInt(top)}`.padEnd(6, '.'),
            `${parseInt(bottom)}`.padEnd(6, '.'),
            `${parseInt(height)}`.padEnd(6, '.'),
            `${parseInt(innerHeight)}`.padEnd(6, '.')
        ) : null;
*/
        return is;
    }

    set isInView(val) {
        //
    }

}