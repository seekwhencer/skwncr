import fs from 'fs-extra';
import {spawn} from 'child_process';
import Crypto from 'crypto';

export default class StoragePDF {
    constructor(parent, options) {
        this.debug = true;
        this.label = 'STORAGE PDF';
        this.parent = parent;
        this.storage = this.parent;
        this.server = this.storage.server;

        //
        this.binary = '/usr/bin/chromium';

        //
        this.sourceUrl = `http://localhost:${this.server.port}/print`;
        this.filePath = '/app/server/static';


    }

    // @TODO check if file exists
    generate(sourceUrl) {
        if (!sourceUrl)
            return false;

        console.log(this.label, 'GENERATING PDF');

        return new Promise((resolve, reject) => {
            const hash = `${Crypto.createHash('md5').update(sourceUrl).digest("hex")}`;
            const pdfRealPath = `${this.filePath}/${hash}.pdf`;
            const processOptions = ['--headless', '--no-pdf-header-footer', '--no-sandbox', '--disable-gpu', '--disable-pdf-tagging', `--print-to-pdf=${pdfRealPath}`, `${sourceUrl}`];
            console.log(processOptions.join(' '));
            this.pdfProcess = spawn(this.binary, processOptions);
            this.pdfProcess.on('exit', () => resolve(this.file(sourceUrl)));
            this.debug ? this.pdfProcess.stderr.on('data', chunk => console.log('>>>', chunk.toString())) : null;
        });
    }

    file(sourceUrl) {
        const hash = `${Crypto.createHash('md5').update(sourceUrl).digest("hex")}`;
        const realPath = `${this.filePath}/${hash}.pdf`;

        //@TODO check if file exists
        return fs.readFileSync(`${realPath}`);
    }
}