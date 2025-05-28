import fs from 'node:fs';

/**
 *
 * @TODO autoloader
 *
 * this is the static stack of templates files
 * loaded at once at start up at class creation
 * loaded never again
 * template file is an es6 template literal string
 * a file with extension .html
 * a string without ` at the beginning and at the end
 *
 */

// to read the template file as string
// sync because it happens at start up
const fileBasePath = './src/Pages/Templates';
const fileBasePathFrontend = '../frontend/src/templates';

// read templates from server stack
const readTemplate = (file) => fs.readFileSync(`${fileBasePath}/${file}`).toString();

// read templates from frontend stack (because they are reusable)
const readFrontendTemplate = (file) => fs.readFileSync(`${fileBasePathFrontend}/${file}`).toString();

// the stack
let templates = {

    global: {
        header: 'global/header.html',
        footer: 'FooterTemplate.html',
        navigation: 'HeaderTemplate.html',
        sectionFooter: 'Elements/SectionFooterElement.html'
    },

    page: {
        test: 'index/test.html',
        home: 'index/home.html',
        homePrint: 'index/print.html',
        person: 'index/person.html',
    },

    pages: {
        person: {
            splash: 'pages/person/SplashPersonSectionTemplate.html'
        }
    },

    section: {
        splash: 'SplashTemplate.html',
        person: 'PersonTemplate.html',
        vita: 'VitaTemplate.html',
        skills: 'SkillsTemplate.html',
        services: 'ServicesTemplate.html',
        projects: 'ProjectsTemplate.html',
        projectsPrint: 'ProjectsPrintTemplate.html',
        disclaimer: 'DisclaimerTemplate.html'
    },
    partials: {
        projectListing : 'Elements/ProjectTemplate.html',
        splashVideoSelection : 'Elements/SplashVideoSelectionTemplate.html',
    }
};

//
const DocumentHeaderTemplate = readTemplate(templates.global.header);
const DocumentFooterTemplate = readFrontendTemplate(templates.global.footer);
const PageNavigationTemplate = readFrontendTemplate(templates.global.navigation);
const SectionFooterTemplate = readFrontendTemplate(templates.global.sectionFooter);

const TestPageTemplate = readTemplate(templates.page.test);
const HomePageTemplate = readTemplate(templates.page.home);
const PersonPageTemplate = readTemplate(templates.page.person);

const HomePrintPageTemplate = readTemplate(templates.page.homePrint);

const SplashSectionTemplate = readFrontendTemplate(templates.section.splash);
const PersonSectionTemplate = readFrontendTemplate(templates.section.person);
const VitaSectionTemplate = readFrontendTemplate(templates.section.vita);
const SkillsSectionTemplate = readFrontendTemplate(templates.section.skills);
const ServicesSectionTemplate = readFrontendTemplate(templates.section.services);
const ProjectsSectionTemplate = readFrontendTemplate(templates.section.projects);
const DisclaimerSectionTemplate = readFrontendTemplate(templates.section.disclaimer);

const ProjectsPrintSectionTemplate = readFrontendTemplate(templates.section.projectsPrint);

const ProjectListingElementTemplate = readFrontendTemplate(templates.partials.projectListing);
const SplashVideoSelectionTemplate = readFrontendTemplate(templates.partials.splashVideoSelection);

const SplashPersonSectionTemplate = readTemplate(templates.pages.person.splash);

//
export {
    DocumentHeaderTemplate,
    DocumentFooterTemplate,
    PageNavigationTemplate,
    SectionFooterTemplate,

    TestPageTemplate,
    HomePageTemplate,
    PersonPageTemplate,

    HomePrintPageTemplate,

    SplashSectionTemplate,
    PersonSectionTemplate,
    VitaSectionTemplate,
    SkillsSectionTemplate,
    ServicesSectionTemplate,
    ProjectsSectionTemplate,
    ProjectsPrintSectionTemplate,
    DisclaimerSectionTemplate,

    ProjectListingElementTemplate,
    SplashVideoSelectionTemplate,

    SplashPersonSectionTemplate
};