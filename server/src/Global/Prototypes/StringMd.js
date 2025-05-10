import Markdownit from "markdown-it";
import hljs from "highlight.js";

import javascriptHL from 'highlight.js/lib/languages/javascript';
import bashHL from 'highlight.js/lib/languages/bash';
import yamlHL from 'highlight.js/lib/languages/yaml';

export default function () {
    const md = Markdownit({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(str, {language: lang}).value;
                } catch (e) {
                }
            }

            return '';
        }
    });
    return md.render(this.toString());
}