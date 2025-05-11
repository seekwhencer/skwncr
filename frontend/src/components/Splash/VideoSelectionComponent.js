import Component from "../Component.js";

export default class VideoSelectionComponent extends Component {
    constructor(parent, options) {
        super(parent, options);

        this.element = this.parent.element.querySelector('[data-video-selection]');
        this.video = this.parent.element.querySelector('video');

        this.randomButton = this.element.querySelector('[data-splash-toggle-video]');
        this.randomButton.onclick = (e) => {
            e.preventDefault();
            this.randomVideo();
        }

        this.buttons = this.element.querySelectorAll('[data-splash-video]');
        this.buttons.forEach((b, i) => {
            b.onclick = (e) => {
                e.preventDefault();
                this.video.src = this.videoSources[i];
            }
        });

        this.videoSources = [...this.buttons].map(a => a.dataset.splashVideo);
        this.randomVideo();
    }

    randomVideo() {
        if (!this.app.isDesktop)
            return;

        const r = () => {
            const rand = Math.floor(Math.random() * this.videoSources.length);
            if (this.video.src.includes(this.videoSources[rand]))
                return r();

            return rand;
        }
        this.video.src = this.videoSources[r()];
    }
}
