import fs from 'node:fs';
import Page from '../Page.js';

export default class HomePage extends Page {
    constructor(parent, options) {
        super(parent, options);

        this.template = this.readTemplate('./src/Pages/Templates/index.html');
        this.css = this.getCSS();
        this.js = this.getJS();

        this.cssPlain = this.getCSSPlain();
        this.jsPlain = this.getJSPlain();
    }

    // can be sync on startup
    readTemplate(file) {
        return fs.readFileSync(file).toString();
    }

    // can be sync on startup
    getCSS() {
        const dir = fs.readdirSync('../frontend/dist/css');
        return dir.filter(i => i.match(/(?<=index-).*?(?=\.css)/));
    }

    // can be sync on startup
    getJS() {
        const dir = fs.readdirSync('../frontend/dist/js');
        return dir.filter(i => i.match(/(?<=index-).*?(?=\.js)/));
    }

    //
    getCSSPlain() {
        return fs.readFileSync(`./static/css/${this.css}`).toString();
    }

    getJSPlain() {
        return fs.readFileSync(`./static/js/${this.js}`).toString();
    }

    // generate the markup from template literal
    html() {
        this.dom = this.markup(this.template, {
            icon: 'images/vite.svg',
            css: `css/${this.css}`,
            js: `js/${this.js}`,
            jsPlain: this.jsPlain,
            cssPlain: this.cssPlain,
            google: `YT7oD0nXVnJivNS6krbAz3l8tL6nEkbzPm09e00XtNQ`,
            viewPort: 'height=device-height, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi',
            title: 'skwncr.net | Matthias Kallenbach | Web-Entwickler, Frontend-Entwickler, Web-Designer in Eberswalde',
            keywords: 'Frontend-Entwicklung, Web-Entwicklung, Web, Internet, Entwicklung, Web-Design, Javascript, node.js, docker, Smart Home, Eberswalde, 16230, Britz, Chorin, Barnim',
            description: 'Web- / Frontend-Entwicklung und Web-Design aus einer Hand aus Eberswalde. Wartung, Lösungen, Smart Home, Internet of Things und Workshops in Eberswalde, Britz, Chorin, Angermünde, Barnim und natürlich Berlin. ',
            robots: 'index,follow',
            og: {
                type: 'website',
                url: 'https://skwncr.net',
                image: 'https://skwncr.net/images/website.png?s=l',
                imageAlt: 'Screenshot der Website'
            },
            x: {} // elon...

        });
        return this.dom;
    }
}