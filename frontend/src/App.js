import BrowserDetector from 'browser-dtector';
import {
    createElement,
    Menu,
    Lightbulb,
    TentTree,
    BookOpenCheck,
    Microchip,
    DraftingCompass,
    Ambulance,
    Ship,
    ShipWheel,
    HeartHandshake,
    Linkedin,
    Facebook,
    Youtube,
    Github,
    Bot,
    Heart,
    ArrowDownFromLine,
    ArrowUpFromLine,
} from 'lucide';

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

import './scss/index.scss';

export default class App {
    constructor() {
        this.browser = new BrowserDetector(window.navigator.userAgent).parseUserAgent();

        //
        this.element = document.querySelector('#root');
        this.draw();
    }

    draw() {
        this.icons = {
            menu: createElement(Menu).outerHTML,
            consulting: createElement(ShipWheel).outerHTML,
            development: createElement(DraftingCompass).outerHTML,
            support: createElement(Ambulance).outerHTML,
            solutions: createElement(Ship).outerHTML,
            edgecomputing: createElement(Microchip).outerHTML,
            smarthome: createElement(Lightbulb).outerHTML,
            neighbourhood: createElement(HeartHandshake).outerHTML,
            workshops: createElement(BookOpenCheck).outerHTML,
            fun: createElement(TentTree).outerHTML,
            linkedin: createElement(Linkedin).outerHTML,
            facebook: createElement(Facebook).outerHTML,
            youtube: createElement(Youtube).outerHTML,
            github: createElement(Github).outerHTML,
            bot: createElement(Bot).outerHTML,
            heart: createElement(Heart).outerHTML,
            arrowUpLine: createElement(ArrowUpFromLine).outerHTML,
            arrowDownLine: createElement(ArrowDownFromLine).outerHTML,
        }

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
        return this.browser.isMobile;
    }

    set isMobile(val) {
        //
    }
    get isDesktop() {
        return this.browser.isDesktop;
    }

    set isDesktop(val) {
        //
    }
}

