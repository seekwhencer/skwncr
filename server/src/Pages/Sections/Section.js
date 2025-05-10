import Page from '../../Page.js';
import {SectionFooterTemplate} from '../Templates/index.js';

export default class Section extends Page {
    constructor(parent, options) {
        super(parent, options);

        this.sectionFooter = this.render(SectionFooterTemplate);
    }
}