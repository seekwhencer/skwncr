import Component from "../Component.js";
import VitaBeeComponent from "./VitaBee.js";
import VitaBeeSwarmTemplate from "../../templates/Elements/VitaBeeSwarm.html?raw"

export default class VitaBeeSwarmComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.parent;

        this.beeNum = 10;
        this.draw();
        this.createSwarm();
    }

    createSwarm() {
        this.bees = [];
        for (let i = 0; i < this.beeNum; i++) {
            const bee = new VitaBeeComponent(this)
            this.bees.push(bee);
        }
    }

    draw() {
        this.element = VitaBeeSwarmTemplate.dom({});
        this.target.element.append(this.element);
    }
}