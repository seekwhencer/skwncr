import Events from '../global/Events.js';

export default class Component extends Events {
    constructor(parent, options) {
        super(parent, options);
        this.parent = this.app = parent;
        this.options = options || {};
    }
}