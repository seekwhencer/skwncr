import Component from "./Component.js";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('main');
    }
 }