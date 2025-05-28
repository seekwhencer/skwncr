import Route from '../Route.js';

export default class HomeRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.router.get('/', (req, res, next) => {
            res.send(this.webServer.homePage.html());
        });

        this.router.get('/print', (req, res, next) => {
            res.send(this.webServer.homePrintPage.html());
        });

        return this.router;
    }
}


