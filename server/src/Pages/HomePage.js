import PageDocument from '../PageDocument.js';
import PageNavigation from './Global/PageNavigation.js';

import {
    SplashSection,
    PersonSection,
    VitaSection,
    SkillsSection,
    ServicesSection,
    ProjectsSection,
    DisclaimerSection
} from './Sections/index.js';

import {HomePageTemplate} from './Templates/index.js';

export default class HomePage extends PageDocument {
    constructor(parent, options) {
        super(parent, options);
        this.template = HomePageTemplate;
        this.pageNavigation = new PageNavigation(this);
        this.disableCache = process.env?.ENV !== 'production' ? true : false;

        // sections
        this.splashSection = new SplashSection(this);
        this.personSection = new PersonSection(this);
        this.vitaSection = new VitaSection(this);
        this.skillsSection = new SkillsSection(this);
        this.servicesSection = new ServicesSection(this);
        this.projectsSection = new ProjectsSection(this);
        this.disclaimerSection = new DisclaimerSection(this);
    }

    html(options = {}, req = false, res = false) {
        if (this.useCache() && !this.disableCache)
            return this.cache;

        let templateData = {
            documentLanguage: this.headerMeta.lang,
            documentHeader: this.documentHeader.html(),
            pageNavigation: this.pageNavigation.html({
                className: 'splash',
                active: false
            }),
            section: {
                splash: this.splashSection.html(),
                person: this.personSection.html(),
                vita: this.vitaSection.html(),
                skills: this.skillsSection.html(),
                service: this.servicesSection.html(),
                projects: this.projectsSection.html(),
                disclaimer: this.disclaimerSection.html()
            },
            pageFooter: this.documentFooter.html(),
            jsPlain: '',
            ...options
        };

        if (process.env?.ENV !== 'production') {
            // dont embed the bundled css in development mode
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
