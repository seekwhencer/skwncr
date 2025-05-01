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
        this.engine.use(express.static(this.staticsPath));
    }
}