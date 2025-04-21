import Component from "../Component.js";
import ProjectTemplate from "../../templates/Elements/ProjectTemplate.html?raw";

export default class ProjectComponent extends Component {
    constructor(parent, options) {
        super(parent, options);
        this.target = this.parent;
    }

    draw() {
        this.element = ProjectTemplate.dom({
           ...this.options,
            images: this.options?.images || [],
            highlight: this.options.highlight || false,
            icons: this.app.icons
        });
        this.target.projectsElement.append(this.element);
    }

    open(){
        console.log(this.element);
        this.parent.flush();
        this.element.classList.add('active');
    }

    close(){
        this.element.classList.remove('active');
    }

    get index() {
        return this.parent.projects.indexOf(this);
    }

    set index(val) {
        this._index = val;
    }
}