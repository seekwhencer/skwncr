import Page from '../Page.js';
import {TestTemplate} from './Templates/index.js';
import PageHeader from './Global/Header.js';
import PageFooter from './Global/Footer.js';

export default class TestPage extends Page {
    constructor(parent, options) {
        super(parent, options);

        this.template = TestTemplate;
        this.header = new PageHeader(this);
        this.footer = new PageFooter(this);
    }

    html() {
        this.dom = this.markup(this.template, {
            pageHeader: this.header.html(),
            pageFooter: this.footer.html(),
            jsPlain: this.headerMeta.jsPlain,
        });
        return this.dom;
    }
}