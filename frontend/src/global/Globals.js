import Markdownit from 'markdown-it';
import hljs from 'highlight.js';
import javascriptHL from 'highlight.js/lib/languages/javascript';
import bashHL from 'highlight.js/lib/languages/bash';
import yamlHL from 'highlight.js/lib/languages/yaml';

/**
 * Eval Magic
 *
 * import MyTemplate from './TemplateFile.html?raw'
 *
 * _T(MyTemplate, {
 *     prop: 'World',
 *     props: ['One', 'Two', 'Three'],
 *     something: {
 *         age: 30
 *         sex: 'female'
 *     }
 * });
 *
 * The template:
 *
 * Hello ${prop},
 * ${props.map(i => `<strong>${i}</strong>`).join('')}
 * ${Object.keys(something).map(k => `<div>${something[k]}</div>`).join('')}
 *
 *
 * @param content
 * @returns {function(*): *}
 * @private
 */
const _C = function (content) {
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

// template literal parser
window._T = (template, data, tag) => _C(template)({scope: data, tag: tag});

// string to dom element(s)
window._DOM = string => {
    const dom = new DOMParser().parseFromString(`${string}`, "text/html");
    const body = dom.documentElement.querySelector('body');
    return body.firstChild;
};

// template to dom
window._TD = (template, data, tag) => _DOM(_T(template, data, tag));

// append template
window._AT = (domArray, target) => domArray.forEach(d => target.append(d));

// the markdown renderer with code hightlight.js
window._MD = function (content) {
    const md = Markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, {language: lang}).value;
                } catch (__) {
                }
            }

            return ''; // use external default escaping
        }
    });
    return md.render(content);
}