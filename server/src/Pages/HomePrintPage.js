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
            title: `${this.headerMeta.title}`,
        }

        // sections
        this.personSection = new PersonSection(this);
        this.vitaSection = new VitaSection(this);
        this.skillsSection = new SkillsSection(this);
        this.servicesSection = new ServicesSection(this);
        this.projectsSection = new ProjectsSection(this);

        this.date = new Date().toLocaleDateString('de-DE');
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
            data: this.data,
            jsPlain: '', // don't embed it all the time
            footer: {
                text: 'Matthias Kallenbach | Frontend-Entwickler | Web-Entwickler',
                date: this.date
            },
            ...options
        };

        // development
        if (process.env?.ENV !== 'production') {
            templateData.documentHeader = this.documentHeader.html({
                title: `+DEV PRINT+ | ${this.headerMeta.title}`,
                cssPlain: '' // dont embed the bundled css
            });
            templateData.jsPlain = ''; // dont embed the bundles js
        } else {  // production
            templateData.documentHeader = this.documentHeader.html({
                cssPlain: this.cssPlain.print, // embed css on production
                js: this.headerMeta.js // use this javascript file
            });
        }

        this.dom = this.render(this.template, templateData);
        return this.dom;
    }

}
