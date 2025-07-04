import http from 'node:http';
import path from 'node:path';
import express from 'express';
import * as Routes from './Routes/index.js';
import Storage from './Storage/index.js';
import Icons from './Global/Icons.js';
import ThumbnailGenerator from './ThumbnailGenerator/index.js';
import {
    TestPage,
    HomePage,
    PrintPage,
    PersonPage
} from './Pages/index.js';

export default class WebServer {
    constructor() {
        this.webServer = this;
        this.server = false;
        this.engine = express();
        this.port = parseInt(process.env?.SERVER_PORT || 9090);
        this.staticsPath = path.resolve('./static');
        this.baseUrl = '';

        // icons
        this.icons = Icons;

        // the storage for all file activities
        this.storage = new Storage(this);

        // @TODO add queue
        this.thumbnailGenerator = new ThumbnailGenerator(this);

        // create the page objects
        this.registerPages();

        // create all page routes
        this.registerRoutes();

        // register static assets
        this.registerStatics();

        this.start();
    }

    start() {
        this.server = http.Server(this.engine);
        this.server.listen(this.port, () => {
            LOG(` SERVER:`.padStart(20,'·'), 'UP');
            LOG(` PORT:`.padStart(20,'·'), this.port);
            LOG(` ENVIRONMENT:`.padStart(20, '·'), global.ENVIRONMENT);
            LOG(` DEBUG:`.padStart(20, '·'), global.DEBUG);
        });
    }

    registerRoutes() {
        Object.keys(Routes).forEach(route => this.engine.use(this.baseUrl, new Routes[route](this)));
    }

    registerStatics() {
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

        // because the embedded style file looks in this path
        this.engine.use('/fonts', express.static(`${this.staticsPath}/css/fonts`, options));

        // not more used, but exists
        this.engine.use('/css', express.static(`${this.staticsPath}/css`, options));

        // not more used, but exists
        this.engine.use('/js', express.static(`${this.staticsPath}/js`, options));

        // the video files
        this.engine.use('/video', express.static(`${this.staticsPath}/video`, options));
    }

    registerPages() {
        // testing development
        this.testPage = new TestPage(this);

        // home page
        this.homePage = new HomePage(this);

        // print page(s)
        this.printPage = new PrintPage(this);

        // sub pages
        this.personPage = new PersonPage(this);
    }
}