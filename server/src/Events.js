import {EventEmitter} from 'node:events';

export default class Events {
    constructor(parent, options) {
        this.event = new EventEmitter();
    }

    on() {
        this.event.on.apply(this.event, Array.from(arguments));
    }

    emit() {
        this.event.emit.apply(this.event, Array.from(arguments));
    }
}