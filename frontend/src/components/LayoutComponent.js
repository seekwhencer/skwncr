import Component from "./Component.js";
import LayoutTemplate from "../templates/LayoutTemplate.html?raw";

export default class LayoutComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = _TD(LayoutTemplate, {
            data: _DATA,
            icons: this.app.icons
        });

        this.target.element.append(this.element);
    }
}