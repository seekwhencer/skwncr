import Route from '../Route.js';

export default class ImagesRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        // any/path/to/images/projects
        // the /images/projects/ is the key
        this.router.get(/(.+\/)?images\/projects}\/(.+)/g, (req, res, next) => {

            console.log('>>', req.query, this.nicePath(req.path));

            // @TODO - next() or response...
            next();
        });

        return this.router;
    }
}


