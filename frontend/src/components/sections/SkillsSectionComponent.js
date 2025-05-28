import SectionComponent from "./SectionComponent.js";

export default class SkillsSectionComponent extends SectionComponent {
    constructor(parent, options) {
        super(parent, options);

        this.target = this.options.target ? this.options.target : this.parent;
        this.element = document.querySelector('[data-section=skills]');

        // behavior
        this.element.onclick = (e) => this.select(e);

        //
        this.searchInput = this.element.querySelector('[data-skills-search]');
        this.searchInput.onkeyup = this.searchInput.onblur = () => this.search();

        this.skills = this.element.querySelectorAll('.skill');
    }

    select(e) {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            this.unselectAll();
        }

        if (e.target.classList.contains('skill')) {
            e.target.classList.toggle('like');
        }
    }

    unselectAll() {
        this.skills.forEach(s => s.classList.remove('like'));
    }

    search() {
        const val = this.searchInput.value.toLowerCase();
        this.skills.forEach(s => {
            if (s.dataset.text.toLowerCase().includes(val)) {
                s.classList.remove('hidden');

                if (val !== '') {
                    s.classList.add('match');
                } else {
                    s.classList.remove('match');
                }
            } else {
                s.classList.add('hidden');
                s.classList.remove('match');
            }
        });
    }
}