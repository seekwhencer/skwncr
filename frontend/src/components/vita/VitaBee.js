import Component from "../Component.js";
import VitaBeeTemplate  from "../../templates/Elements/VitaBee.html?raw";

export default class VitaBeeComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.parent;

        this.swarm = this.parent;
        this.bees = this.swarm.bees;
        this.icon = this.app.icons.bee;

        this.draw();
    }

    draw() {
        this.element = VitaBeeTemplate.dom({
            icon : this.icon
        });
        this.target.element.append(this.element);

        // between 1 and 40
        const maxScale = 30;
        const rScale = Math.random() * (maxScale - 1) + 1;
        this.element.style.setProperty('--bee-rand-scale', rScale);

        // between 1 and 100 vw
        const rShift = Math.random() * (100 - 1) + 1;
        this.element.style.setProperty('--bee-rand-horizontal', rShift);
    }

    get index() {
        return this.bees.indexOf(this);
    }

    set index(val) {
        // do nothing
    }
}