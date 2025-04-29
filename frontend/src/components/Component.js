import Events from '../global/Events.js';

export default class Component extends Events {
    constructor(parent, options) {
        super(parent, options);
        this.parent = parent;
        this.app = parent.app;
        this.options = options || {};
    }
}