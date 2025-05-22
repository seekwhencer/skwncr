import Component from "../Component.js";

export default class ServiceComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.element = this.options;
    }

    select() {
        this.getData().then(() => {
            this.parent.open();
            this.parent.active = `${this.index}`;
            this.element.classList.add('active');
            this.parent.flushAll(this.index);
        });
    }

    getData() {
        return new Promise((resolve, reject) => {
            return this.fetch(`/data/services/${this.index}`).then(response => {
                this.data = response;
                resolve('yay');
            });
        });
    }

    flush() {
        this.element.classList.remove('active');
    }

    get index() {
        return this.parent.services.indexOf(this);
    }

    set index(val) {
        this._index = val;
    }
}