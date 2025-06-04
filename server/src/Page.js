import fs from 'node:fs';

export default class Page {
    constructor(parent, options) {
        this.parent = parent;
        this.storage = this.parent.storage;

        this.css = this.storage.css;
        this.js = this.storage.js;

        this.cssPlain = this.storage.cssPlain;
        this.jsPlain = this.storage.jsPlain;

        this.headerMeta = {
            lang: 'de',
            icon: '/images/vite.svg',
            css: `css/${this.css.home}`,
            js: `js/${this.js.home}`,
            jsPlain: this.jsPlain.home,
            cssPlain: this.cssPlain.home,
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
        };

        this.cacheTime = 60;
    }

    render(template, data, tag) {
        return this.markup(template)({scope: data, tag: tag});
    }

    markup(content) {
        content = '`' + content + '`';

        return function (config) {

            function normal(template, ...expressions) {
                return template.reduce((accumulator, part, i) => {
                    return accumulator + expressions[i - 1] + part;
                });
            }

            config = config || {};
            const scope = config.scope || {};
            const tag = config.tag || normal;
            let keys = Object.keys(scope).join(',');
            keys = keys.length ? ',' + keys : '';
            const tagFunc = new Function('tag' + keys, 'return ' + content);
            return config.scope ? tagFunc(tag, ...Object.values(scope)) : tagFunc.apply(this, [tag]);
        }
    }

    useCache(cacheTime) {
        const now = Date.now();
        const age = (now - this.cacheTimestamp) / 1000; // seconds
        return age < (cacheTime || this.cacheTime);
    }

    set dom(val) {
        this._dom = val;
        this.cache = this.dom;
        this.cacheTimestamp = Date.now();
    }

    get dom() {
        return this._dom;
    }
}