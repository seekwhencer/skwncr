import SectionComponent from "./SectionComponent.js";
import SkillTooltipTemplate from "../../templates/Elements/SkillTooltip.html?raw"

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

        this.tooltipTimer = false;
        this.skills = this.element.querySelectorAll('.skill');
        this.skills.forEach(skill => {
            skill.addEventListener('mouseenter', e => {
                clearTimeout(this.tooltipTimer);
                this.tooltipTimer = setTimeout(() => this.showTooltip(skill), 800);
            });

            skill.addEventListener('mouseleave', e => {
                clearTimeout(this.tooltipTimer);
                skill.tooltip ? skill.tooltip.remove() : null;
            });
        });


    }

    select(e) {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            this.unselectAll();
        }

        if (e.target.classList.contains('skill')) {
            if (e.target.classList.contains('like')) {
                e.target.classList.remove('like');
            } else {
                e.target.classList.add('like');
            }
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

    showTooltip(skill) {
        const level = skill.closest('.skill-level').querySelector('.level').innerText;
        const index = [...skill.closest('.skill-level').querySelectorAll('.skill')].indexOf(skill);
        this.getData(level, index).then(data => this.showData(skill, data));
    }

    showData(skill, data) {
        skill.tooltip = SkillTooltipTemplate.dom(data);
        skill.append(skill.tooltip);
        setTimeout(() => skill.tooltip.classList.remove('hidden'), 0);
    }

    getData(level, index) {
        return new Promise((resolve, reject) => {
            return this.fetch(`/data/skills/${level}/${index}`).then(response => resolve(response));
        });
    }
}