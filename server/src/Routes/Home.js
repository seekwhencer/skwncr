import Route from '../Route.js';

export default class HomeRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.router.get('/', (req, res, next) => {
            res.send(this.webServer.homePage.html());
        });

        return this.router;
    }
}


