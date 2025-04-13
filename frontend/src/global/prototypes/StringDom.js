const build = function (content) {
    content = '`' + content + '`';

    return function (config) {

        function normal(template, ...expressions) {
            return template.reduce((accumulator, part, i) => {
                return accumulator + expressions[i - 1] + part;
            });
        }

        config = config || {};
        const scope = config.scope || {};
        const tag = config.tag || normal;
        let keys = Object.keys(scope).join(',');
        keys = keys.length ? ',' + keys : '';
        const tagFunc = new Function('tag' + keys, 'return ' + content);
        return config.scope ? tagFunc(tag, ...Object.values(scope)) : tagFunc.apply(this, [tag]);
    }
}

export default function (data, tag) {
    try {
        const template = build(this)({scope: data, tag: tag});
        const dom = new DOMParser().parseFromString(`${template}`, "text/html");
        return dom.documentElement.querySelector('body').firstChild;
    } catch (e) {
    }
}