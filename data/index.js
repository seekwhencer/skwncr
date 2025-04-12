import {readFileSync, writeFileSync, watch} from 'node:fs';

const sourceRootPath = './storage';
const sourceRootFile = 'index.json';
const targetFile = 'data.json';

let data = {};
let debounceTimer = false;

const watchTask = watch(sourceRootPath, {
    encoding: 'buffer',
    recursive: true,
    persistent: true
});

watchTask.on('change', (e, f) => {
    debounceTimer ? clearTimeout(debounceTimer) : null;
    debounceTimer = setTimeout(() => build(e, f), 500);
});

const build = (e, f) => {
    data = fromFile(`${sourceRootPath}/${sourceRootFile}`);
    writeTarget();

    console.log('DATA WRITTEN', targetFile);
}

const fromFile = (jsonFile) => {
    const fileData = readFileSync(jsonFile);
    let jsonData = false;

    // parse jsonDATA
    try {
        jsonData = JSON.parse(fileData);
        return parseJsonRecursively(jsonData, (value, path) => {
            if (typeof value === "string") {

                try { // include json, try matching
                    const regex = /\$\{([^}]+)\.json\}/g;
                    const matches = [...value.matchAll(regex)];
                    const nestingJSON = `${sourceRootPath}/${matches[0][1]}.json` || false;
                    return fromFile(nestingJSON);
                } catch (e) {

                }

                try { // include markdown, try matching
                    const regex = /\$\{([^}]+)\.md\}/g;
                    const matches = [...value.matchAll(regex)];
                    const nestingMD = `${sourceRootPath}/${matches[0][1]}.md` || false;
                    return fromMarkdown(nestingMD);
                } catch (e) {

                }
            }
            return value;
        });
    } catch (e) {
        console.log('ERROR', jsonFile);
        return false;
    }
}

const parseJsonRecursively = (data, callback, path = []) => {
    if (Array.isArray(data)) {
        return data.map((item, index) =>
            parseJsonRecursively(item, callback, [...path, index])
        );
    } else if (data !== null && typeof data === "object") {
        const result = {};
        for (const [key, value] of Object.entries(data)) {
            result[key] = parseJsonRecursively(value, callback, [...path, key]);
        }
        return result;
    } else {
        return callback(data, path);
    }
}

const fromMarkdown = markdownFile => {
    const fileData = readFileSync(markdownFile);
    return fileData.toString();
}

const writeTarget = () => {
    writeFileSync(targetFile, JSON.stringify(data));
}

//
build();