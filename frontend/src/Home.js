import './global/Globals.js';
import Data from '../../data/data.json';
window._DATA = Data;

import './scss/home.scss';

import BrowserDetector from 'browser-dtector';
import Icons from "./components/Icons.js";

import HeaderComponent from "./components/HeaderComponent.js";
import LayoutComponent from "./components/LayoutComponent.js";
import {
    DisclaimerSectionComponent,
    FooterSectionComponent,
    PersonSectionComponent,
    ProjectsSectionComponent,
    ServicesSectionComponent,
    SkillsSectionComponent,
    SplashSectionComponent,
    VitaSectionComponent
} from "./components/sections/index.js";

export default class App {
    constructor() {
        this.browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent();
        this.app = this;
        this.icons = Icons;
        this.urlBase = '';

        //
        this.element = document.querySelector('#root');
        this.draw();
    }

    draw() {
        /**
         * page elements: header, main
         */

        this.header = new HeaderComponent(this);
        this.layout = new LayoutComponent(this);


        /**
         * the sections
         */

        const sectionOptions = {
            target: this.layout
        };

        this.splash = new SplashSectionComponent(this, sectionOptions);
        this.person = new PersonSectionComponent(this, sectionOptions);
        this.vita = new VitaSectionComponent(this, sectionOptions);
        this.skills = new SkillsSectionComponent(this, sectionOptions);
        this.services = new ServicesSectionComponent(this, sectionOptions);
        this.projects = new ProjectsSectionComponent(this, sectionOptions);
        this.disclaimer = new DisclaimerSectionComponent(this, sectionOptions);
        this.footer = new FooterSectionComponent(this);
    }

    get isMobile() {
        this.browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent();
        return this.browser.isMobile;
    }

    set isMobile(val) {
        //
    }
    get isDesktop() {
        this.browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent();
        return this.browser.isDesktop;
    }

    set isDesktop(val) {
        //
    }
}

window._APP = new App();