import PageDocument from '../PageDocument.js';
import PageNavigation from './Global/PageNavigation.js';
import {PersonSection} from './Sections/index.js';
import {PersonPageTemplate} from './Templates/index.js';
import SplashPersonSection from "./Sections/Person/SplashPersonSection.js";

export default class PersonPage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);
        this.template = PersonPageTemplate;

        this.pageNavigation = new PageNavigation(this);
        this.person = new PersonSection(this);
        this.splash = new SplashPersonSection(this);

        this.headerMeta = {
            css: `css/${this.css.person}`,
            js: `js/${this.js.person}`,
            jsPlain: this.jsPlain.person,
            cssPlain: this.cssPlain.person,
            title: `Person | ${this.headerMeta.title}`,
        }
    }

    html(options = {}) {
        if (this.useCache() && !this.disableCache)
            return this.cache;

        const templateData = {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html(),
            pageNavigation: this.pageNavigation.html({
                className: '',
                active: 'person'
            }),
            pageFooter: this.documentFooter.html(),
            section: {
                splash: this.splash.html(),
                person: this.person.html(),
                footer: 'FOOTER SECTIOn'
            },
            jsPlain: '',
            ...options
        };

        if (global.ENVIRONMENT !== 'production') {
            // dont embed the bundled css
            templateData.documentHeader = this.documentHeader.html({
                title: `+DEV+ | ${this.headerMeta.title}`,
                cssPlain: ''
            });

            // dont embed the bundles js
            templateData.jsPlain = '';
        }

        this.dom = this.render(this.template, templateData);
        return this.dom;
    }
}
