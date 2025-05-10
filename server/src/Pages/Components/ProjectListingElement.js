import Page from '../../Page.js';
import {ProjectListingElementTemplate} from '../Templates/index.js';

export default class ProjectListingElement extends Page {
    constructor(parent, options) {
        super(parent, options);
        this.template = ProjectListingElementTemplate;
        this.data = options;
    }

    html(options = {}) {
        this.dom = this.render(this.template, {
            ...this.data,
            images: this.data?.images || [],
            highlight: this.data?.highlight || false,
            ...options
        });
        return this.dom;
    }
}
