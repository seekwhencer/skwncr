import Route from '../Route.js';

export default class PrintRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.storage = this.parent.storage;

        this.router.get('/print', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaFull', embed: embed(req)}));
        });

        this.router.get('/print/vita-komplett', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaFull', embed: embed(req)}));
        });

        this.router.get('/print/vita-kurz', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaShort', embed: embed(req)}));
        });

        this.router.get('/print/services', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'services', embed: embed(req)}));
        });

        return this.router;
    }
}

const embed = req => Object.prototype.hasOwnProperty.call(req?.query, 'embed');


