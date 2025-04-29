import Route from '../Route.js';

export default class HomeRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.router.get('/', (req, res, next) => {
            // do things on home page request
            // ...

            next();
        });

        return this.router;
    }
}


