import PageDocument from "../PageDocument.js";
import {PersonPageTemplate} from './Templates/index.js';

export default class PersonPage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);
        this.template = PersonPageTemplate;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html({title: 'Person page'}),
            pageContent: '',// this.main.html(),
            jsPlain: '', //this.headerMeta.jsPlain,
            ...options
        });
        return this.dom;
    }
}
