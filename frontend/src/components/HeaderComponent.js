import Component from "./Component.js";
import HeaderTemplate from "../templates/HeaderTemplate.html?raw";

export default class HeaderComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;

        this.element = HeaderTemplate.dom({
            data: _DATA,
            icons: this.app.icons
        });

        this.target.element.append(this.element);
    }
}