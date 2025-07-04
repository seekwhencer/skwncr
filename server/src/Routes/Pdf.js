import Route from '../Route.js';

export default class PdfRoutes extends Route {
    constructor(parent, options) {
        super(parent, options);

        this.server = this.parent;
        this.storage = this.server.storage;

        this.router.get('/pdf', async (req, res, next) => {
            const sourceUrl = `http://localhost:${this.server.port}/print/vita-kurz?embed`;
            this.storage.generatePDF(sourceUrl).then(pdfFile => {
                res.contentType("application/pdf");
                res.send(pdfFile);
            });
        });

        this.router.get('/pdf/vita-kurz', async (req, res, next) => {
            const sourceUrl = `http://localhost:${this.server.port}/print/vita-kurz?embed`;
            this.storage.generatePDF(sourceUrl).then(pdfFile => {
                res.contentType("application/pdf");
                res.send(pdfFile);
            });
        });

        this.router.get('/pdf/vita-komplett', async (req, res, next) => {
            const sourceUrl = `http://localhost:${this.server.port}/print/vita-komplett?embed`;
            this.storage.generatePDF(sourceUrl).then(pdfFile => {
                res.contentType("application/pdf");
                res.send(pdfFile);
            });
        });

        this.router.get('/pdf/services', async (req, res, next) => {
            const sourceUrl = `http://localhost:${this.server.port}/print/services?embed`;
            this.storage.generatePDF(sourceUrl).then(pdfFile => {
                res.contentType("application/pdf");
                res.send(pdfFile);
            });
        });

        return this.router;
    }
}


