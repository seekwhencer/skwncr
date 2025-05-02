import http from "node:http";
import path from "node:path";
import express from "express";
import * as Routes from "./Routes/index.js";
import Storage from "./Storage.js";
import ThumbnailGenerator from "./ThumbnailGenerator/index.js";

export default class WebServer {
    constructor() {
        this.server = false;
        this.engine = express();
        this.port = parseInt(process.env?.SERVER_PORT || 9090);
        this.staticsPath = path.resolve('./static');
        this.baseUrl = '';

        //
        this.storage = new Storage(this);

        //
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
        const options = {
            dotfiles: 'ignore',
            etag: false,
            //extensions: ['html', 'css', 'js'],
            //index: 'index.html',
            maxAge: '1d',
            redirect: true,
            setHeaders: (res, path, stat) => {
                res.set('Cache-Control', 'public, max-age=86400');
            }
        };

        //this.engine.use(express.static(this.staticsPath, options));

        this.engine.get('/', (req, res) => res.sendFile(`${this.staticsPath}/index.html`));
        this.engine.use('/css', express.static(`${this.staticsPath}/css`, options));
        this.engine.use('/js', express.static(`${this.staticsPath}/js`, options));
        this.engine.use('/video', express.static(`${this.staticsPath}/video`, options));
    }
}