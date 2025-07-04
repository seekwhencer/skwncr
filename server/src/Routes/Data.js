import Route from '../Route.js';

export default class DataRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.storage = this.parent.storage;

        this.router.get('/data', async (req, res, next) => {
            // if a query parameter "reload" exists
            if (reload(req) === true) {
                this.storage.data.load().then(() => res.json(this.storage.data));
            } else {
                res.json(this.storage.data);
            }
        });

        // the data browser... simple as hell
        // accessing the data(.json) from url path
        // /data is the whole data.json
        // /data/person/education reduce the output by key(s) from the data.json
        this.router.get(/\/data\/(.+)/, async (req, res, next) => {
            const path = this.extractPath(req.path);
            path.shift();

            let result = this.storage.data;
            path.forEach(p => result[p] ? result = result[p] : result = {});
            res.json(result);
        });

        return this.router;
    }
}

const reload = req => Object.prototype.hasOwnProperty.call(req?.query, 'reload');


