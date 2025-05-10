import Route from '../Route.js';

export default class PersonRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.router.get('/person', (req, res, next) => {
            // do things on home page request
            // ...

            res.send(this.parent.personPage.html());
        });

        return this.router;
    }
}


