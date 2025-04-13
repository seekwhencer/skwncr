import {css, dom, md} from './prototypes';

/**
 * prototyping the HTMLElement with a functional css proxy
 *
 * use to get the applied and computed style:
 *
 * before:  element.style.background
 * now:     element.css.background()
 *
 * before:  element.style.background = 'red';
 * now:     element.css.background('red');
 *
 * @returns {CSSStyleDeclaration}
 */
HTMLElement.prototype.css = css;

/**
 * Eval Magic
 *
 * import MyTemplate from './TemplateFile.html?raw'
 *
 * MyTemplate.dom({
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
 */
String.prototype.dom = dom;

/**
 * create markdown from string
 *
 * @returns {String}
 */
String.prototype.md = md;