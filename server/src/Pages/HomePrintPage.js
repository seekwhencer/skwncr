import PageDocument from '../PageDocument.js';

import {
    PersonSection,
    VitaSection,
    SkillsSection,
    ServicesSection,
    ProjectsSection,
} from './Sections/index.js';

import {HomePrintPageTemplate} from './Templates/index.js';

export default class HomePrintPage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);
        this.template = HomePrintPageTemplate;
        this.disableCache = process.env?.ENV !== 'production' ? true : false;

        this.headerMeta = {
            js: `js/${this.js.print}`,
            jsPlain: `js/${this.jsPlain.print}`,
            css: `css/${this.css.print}`,
            cssPlain: this.cssPlain.print,
        }

        // sections
        this.personSection = new PersonSection(this);
        this.vitaSection = new VitaSection(this);
        this.skillsSection = new SkillsSection(this);
        this.servicesSection = new ServicesSection(this);
        this.projectsSection = new ProjectsSection(this);
    }

    html(options = {}, req = false, res = false) {
        if (this.useCache() && !this.disableCache)
            return this.cache;

        let templateData = {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html(this.headerMeta),
            section: {
                intro: '',
                person: this.personSection.html(),
                vita: this.vitaSection.html(),
                skills: this.skillsSection.html(),
                service: this.servicesSection.html(),
                projects: this.projectsSection.html(),
            },
            jsPlain: '', // don't embed it all the time
            ...options
        };

        // development
        if (process.env?.ENV !== 'production') {
            // dont embed the bundled css
            templateData.documentHeader = this.documentHeader.html({
                title: `+DEV PRINT+ | ${this.headerMeta.title}`,
                cssPlain: ''
            });

            // dont embed the bundles js
            templateData.jsPlain = '';

        } else {  // production
            templateData.documentHeader = this.documentHeader.html({
                cssPlain: this.cssPlain.print,
                js: this.headerMeta.js
            });
        }

        this.dom = this.render(this.template, templateData);
        return this.dom;
    }

}
