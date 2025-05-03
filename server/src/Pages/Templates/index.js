import fs from 'node:fs';

//
const templates = {
    home: './something.html',
};

//
const data = {}
Object.keys(templates).forEach(page => data[page] = fs.readFileSync(templates[page]) );

//
export default data;