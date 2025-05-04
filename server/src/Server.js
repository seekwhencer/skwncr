import http from "node:http";
import path from "node:path";
import express from "express";
import * as Routes from "./Routes/index.js";
import Storage from "./Storage.js";
import ThumbnailGenerator from "./ThumbnailGenerator/index.js";
import HomePage from "./Pages/Home.js";

export default class WebServer {
    constructor() {
        this.server = false;
        this.engine = express();
        this.port = parseInt(process.env?.SERVER_PORT || 9090);
        this.staticsPath = path.resolve('./static');
        this.baseUrl = '';

        // the html generator from string literal templates
        this.homePage = new HomePage(this);

        //
        this.storage = new Storage(this);

        // not in use at the moment.
        // @TODO add queue
        this.thumbnailGenerator = new ThumbnailGenerator(this);

        this.registerRoutes();
        this.registerStatics();

        this.start();
    }

    start() {
        this.server = http.Server(this.engine);
        this.server.listen(this.port, () => {
            console.log('>> SERVER UP ON PORT:', this.port);
        });
    }

    registerRoutes() {
        Object.keys(Routes).forEach(route => this.engine.use(this.baseUrl, new Routes[route](this)));
    }

    registerStatics() {
        // home
        this.engine.get('/', (req, res) => res.send(this.homePage.html()));

        // assets
        const options = {
            dotfiles: 'ignore',
            etag: false,
            //extensions: ['html', 'css', 'js'],
            maxAge: '1d',
            redirect: true,
            setHeaders: (res, path, stat) => {
                res.set('Cache-Control', 'public, max-age=86400');
            }
        };

        this.engine.use('/fonts', express.static(`${this.staticsPath}/css/fonts`, options));
        this.engine.use('/css', express.static(`${this.staticsPath}/css`, options));
        this.engine.use('/js', express.static(`${this.staticsPath}/js`, options));
        this.engine.use('/video', express.static(`${this.staticsPath}/video`, options));
    }
}