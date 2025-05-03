export default class Page {
    constructor(parent, options) {
        this.parent = parent;
    }

    markup(string, data, tag) {
        return this.build(string)({scope: data, tag: tag});
    }

    build(content) {
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
}