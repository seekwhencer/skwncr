import {
    createElement,
    Menu,
    Lightbulb,
    TentTree,
    BookOpenCheck,
    Microchip,
    DraftingCompass,
    Ambulance,
    Ship,
    ShipWheel,
    HeartHandshake,
    Linkedin,
    Facebook,
    Youtube,
    Github,
    Bot,
    Heart,
    ArrowDownFromLine,
    ArrowUpFromLine
} from 'lucide';

import { bee } from '@lucide/lab';

export default {
    menu: createElement(Menu).outerHTML,
    consulting: createElement(ShipWheel).outerHTML,
    development: createElement(DraftingCompass).outerHTML,
    support: createElement(Ambulance).outerHTML,
    solutions: createElement(Ship).outerHTML,
    edgecomputing: createElement(Microchip).outerHTML,
    smarthome: createElement(Lightbulb).outerHTML,
    neighbourhood: createElement(HeartHandshake).outerHTML,
    workshops: createElement(BookOpenCheck).outerHTML,
    fun: createElement(TentTree).outerHTML,
    linkedin: createElement(Linkedin).outerHTML,
    facebook: createElement(Facebook).outerHTML,
    youtube: createElement(Youtube).outerHTML,
    github: createElement(Github).outerHTML,
    bot: createElement(Bot).outerHTML,
    heart: createElement(Heart).outerHTML,
    arrowUpLine: createElement(ArrowUpFromLine).outerHTML,
    arrowDownLine: createElement(ArrowDownFromLine).outerHTML,
    bee: createElement(bee).outerHTML
}