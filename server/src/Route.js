import express from "express";

export default class Route {
    constructor(parent, options) {
        this.parent = parent;
        this.webServer = this.parent?.webServer ? this.parent.webServer : false;

        this.router = express.Router();
    }

    nicePath(path) {
        return decodeURI(path).replace(/^\//, '').replace(/\/$/, '');
    }

    extractPath(path, subtract) {
        return this.nicePath(path).replace(new RegExp(`${subtract}`, ''), '').split('/');
    }
}
