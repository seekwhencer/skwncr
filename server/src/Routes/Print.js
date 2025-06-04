import Route from '../Route.js';

export default class PrintRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.storage = this.parent.storage;

        this.router.get('/print', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaFull'}));
        });

        this.router.get('/print/vita-komplett', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaFull'}));
        });

        this.router.get('/print/vita-kurz', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'vitaShort'}));
        });

        this.router.get('/print/services', (req, res, next) => {
            res.send(this.webServer.printPage.html({template: 'services'}));
        });

        return this.router;
    }
}


