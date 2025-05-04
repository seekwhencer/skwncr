import './scss/index.scss';

import BrowserDetector from 'browser-dtector';
import Icons from "./components/Icons.js";

import HeaderComponent from "./components/HeaderComponent.js";
import LayoutComponent from "./components/LayoutComponent.js";
import FooterComponent from "./components/FooterComponent.js";

import SplashComponent from "./components/SplashComponent.js";
import PersonComponent from "./components/PersonComponent.js";
import VitaComponent from "./components/VitaComponent.js";
import ServicesComponent from "./components/ServicesComponent.js";
import SkillsComponent from "./components/SkillsComponent.js";
import ProjectsComponent from "./components/ProjectsComponent.js";
import DisclaimerComponent from "./components/DisclaimerComponent.js";

export default class App {
    constructor() {
        this.browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent();
        this.app = this;
        this.icons = Icons;

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
        this.footer = new FooterComponent(this);

        /**
         * the sections
         */

        this.splash = new SplashComponent(this, {
            target: this.layout
        });

        this.person = new PersonComponent(this, {
            target: this.layout
        });

        this.vita = new VitaComponent(this, {
            target: this.layout
        });

        this.skills = new SkillsComponent(this, {
            target: this.layout
        });

        this.services = new ServicesComponent(this, {
            target: this.layout
        });

        this.projects = new ProjectsComponent(this, {
            target: this.layout
        });

        this.disclaimer = new DisclaimerComponent(this, {
            target: this.layout
        });

        /**
         * the pages
         */


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

