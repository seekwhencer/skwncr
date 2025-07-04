import PageDocument from '../PageDocument.js';

import {
    PersonSection,
    VitaSection,
    SkillsSection,
    ServicesSection,
    ProjectsSection,
} from './Sections/index.js';

import {
    VitaFullPrintPageTemplate,
    VitaShortPrintPageTemplate,
    ServicesPrintPageTemplate,
    SectionFooterTemplate
} from './Templates/index.js';

export default class PrintPage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);

        // toggle between the output sub pages like: vita full, vita short, services
        this.templates = {
            vitaShort: VitaShortPrintPageTemplate,
            vitaFull: VitaFullPrintPageTemplate,
            services: ServicesPrintPageTemplate
        }

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
    }

    html(options = {}, req = false, res = false) {
        if (this.useCache() && !this.disableCache)
            return this.cache;

        // set the sub page template here
        const template = this.templates[options.template];

        // embed force generated css
        const embed = options.embed;

        const date = new Date().toLocaleDateString('de-DE');

        let templateData = {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html(this.headerMeta),
            icons: this.icons,
            section: {
                intro: '',
                person: this.personSection.html(),
                vita: this.vitaSection.html(),
                skills: this.skillsSection.html(),
                service: this.servicesSection.html(),
                projects: this.projectsSection.html(),
            },
            sectionFooter: '',
            data: this.data,
            jsPlain: '', // don't embed it all the time
            footer: {
                text: 'Matthias Kallenbach | Frontend-Entwickler | Web-Entwickler',
                date: date
            },
            ...options
        };

        // development
        if (process.env?.ENV !== 'production' && embed !== true) {
            templateData.documentHeader = this.documentHeader.html({
                title: `+DEV PRINT+ | ${this.headerMeta.title}`,
                cssPlain: '' // dont embed the bundled css
            });
            templateData.jsPlain = ''; // dont embed the bundles js
        }

        // production or embed
        if (process.env?.ENV === 'production' || embed === true) {  // production
            templateData.documentHeader = this.documentHeader.html({
                cssPlain: this.cssPlain.print, // embed css on production
                js: this.headerMeta.js // use this javascript file
            });
        }

        this.dom = this.render(template, templateData);
        return this.dom;
    }

}
