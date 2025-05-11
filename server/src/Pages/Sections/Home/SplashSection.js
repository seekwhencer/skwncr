import {SplashSectionTemplate} from '../../Templates/index.js';
import Section from '../Section.js';
import SplashVideoSelection from '../../Components/SplashVideoSelection.js'

export default class SplashSection extends Section {
    constructor(parent, options) {
        super(parent, options);
        this.template = SplashSectionTemplate;
        this.icons = this.parent.icons;
        this.data = this.parent.data.intro;
        this.videoSelection = new SplashVideoSelection(this);
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            icons: this.icons,
            sectionFooter: this.sectionFooter,
            videoSelection: this.videoSelection.html(),
            ...this.data,
            ...options
        });
        return this.dom;
    }
}
