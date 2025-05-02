import Route from '../Route.js';

export default class ImagesRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);
        this.storage = this.parent.storage;

        //
        //this.router.get(/(.+\/)?images\/(.+)/g, async (req, res, next) => {
        this.router.get(/\/images\/(.+)/, async (req, res, next) => {

            let path = this.nicePath(req.path).split('/');
            const fileName = path[path.length - 1];
            const extension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase();

            path.pop();
            path.shift();
            path = path.join('/');

            if (!this.storage.availableExtensions.includes(extension)) {
                res.sendFile(`${this.storage.imagesRootPath}/${path}/${fileName}`);
                //res.status(404).send('wooop');
                return;
            }

            const folderName = path;

            this.storage
                .imageExists(fileName, folderName, req.query)
                .then(image => res.sendFile(image.thumbnailRealPath))
                .catch(e => res.status(404).send(e)); // @TODO place here the dummy image
        });

        return this.router;
    }
}