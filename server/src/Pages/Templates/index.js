import fs from 'node:fs';
const readTemplate = (file) => fs.readFileSync(file).toString();

const templates = {
    header: './src/Pages/Templates/header.html',
    footer: './src/Pages/Templates/footer.html',
    home: './src/Pages/Templates/index.html',
    test: './src/Pages/Templates/test.html',
};

//
const HomeTemplate = readTemplate(templates.home);
const TestTemplate = readTemplate(templates.test);
const PageHeaderTemplate = readTemplate(templates.header);
const PageFooterTemplate = readTemplate(templates.footer);

//
export {
    HomeTemplate,
    TestTemplate,
    PageHeaderTemplate,
    PageFooterTemplate
};