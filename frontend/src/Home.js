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
         * page elements: header, main, footer
         */

        this.header = new HeaderComponent(this);
        this.layout = new LayoutComponent(this);


        /**
         * the sections
         */
        this.footer = new FooterSectionComponent(this);


        this.splash = new SplashSectionComponent(this, {
            target: this.layout
        });

        this.person = new PersonSectionComponent(this, {
            target: this.layout
        });

        this.vita = new VitaSectionComponent(this, {
            target: this.layout
        });

        this.skills = new SkillsSectionComponent(this, {
            target: this.layout
        });

        this.services = new ServicesSectionComponent(this, {
            target: this.layout
        });

        this.projects = new ProjectsSectionComponent(this, {
            target: this.layout
        });

        this.disclaimer = new DisclaimerSectionComponent(this, {
            target: this.layout
        });
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