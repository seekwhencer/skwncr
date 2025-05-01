import Route from '../Route.js';

export default class ImagesRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.storage = this.parent.storage;
        this.generator = this.parent.thumbnailGenerator;

        this.router.get(/(.+\/)?images\/projects\/(.+)/g, (req, res, next) => {
            const path = this.nicePath(req.path).split('/');
            const folderName = 'projects';
            const fileName = path[path.length - 1];

            this.storage
                .imageExists(fileName, folderName, req.query)
                .then(image => res.sendFile(image.thumbnailRealPath))
                .catch(e => res.status(404).send(e)); // @TODO place here the dummy image
        });

        return this.router;
    }
}