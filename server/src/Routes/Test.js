import Route from '../Route.js';

export default class TestRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.router.get('/test', (req, res, next) => {
            // do things on home page request
            // ...

            res.send(this.parent.testPage.html());
        });

        return this.router;
    }
}


