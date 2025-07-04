import Data from '../../../data/data.json' with {type: 'json'};

export default class StorageData {
    constructor(parent, options) {
        this.data = Data;

        // append hidden props to the data
        this.appendHiddenProperties();

        // return ONLY the data, not the class
        return this.data;
    }

    /**
     * append hidden (not enumerable) properties to the data object
     * the "this" scope in any function targets the data itself - not the class! (maybe)
     * any additional property must be added with "appendHiddenProperties"
     * beware: don't override existing properties from underlying "object" class!
     */
    appendHiddenProperties() {
        const odp = Object.defineProperty;

        // for example
        odp(this.data, "test", {
            value: () => this.test(), // the class scope
            //value: this.test,  // the data scope
            enumerable: false
        });
    }

    test() {
        // "this" is the data ...
        console.log('>>>>>>>>>> ACCESSING DATA', this);
    }
}