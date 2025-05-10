import PageDocument from "../PageDocument.js";
import {TestPageTemplate} from './Templates/index.js';

export default class TestPage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);
        this.template = TestPageTemplate;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html({title: 'Test page'}),
            pageContent: '',// this.main.html(),
            jsPlain: '', //this.headerMeta.jsPlain,
            ...options
        });
        return this.dom;
    }
}
