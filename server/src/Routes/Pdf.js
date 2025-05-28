import Route from '../Route.js';

export default class PdfRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.storage = this.parent.storage;

        this.router.get('/pdf', async (req, res, next) => {
            this.storage.generatePDF().then(pdfFile => {
                res.contentType("application/pdf");
                res.send(pdfFile);
            });
        });

        return this.router;
    }
}


