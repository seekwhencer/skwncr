/**
 * Simple on / emit "events" ;)
 *
 * Register an event
 *
 * this.on('peng', (a,b,c) => {
 *   console.log('PENG', a,b,c);
 * });
 *
 * this.on('hossa', func => func());
 *
 *
 * Emit an event
 *
 * this.emit('peng', 'A', 'B', 'C');
 * this.emit('hossa', () => console.log('HOSSA?'));
 *
  */

export default class Events {
    constructor() {
        this.events = {};
    }

    on(name, func) {
        if (!name || !func)
            return;

        this.events[name] === undefined ? this.events[name] = [] : null;
        this.events[name].push(func);
    }

    emit() {
        const args = Array.from(arguments);
        const name = args[0];
        const data = args.slice(1);

        if (!this.events[name])
            return;

        this.events[name].forEach(func => func(...data));
    }

    removeListener() {

    }

    removeAllListeners(name) {
        if (this.events[name] === undefined)
            return;

        delete this.events[name];
    }
}