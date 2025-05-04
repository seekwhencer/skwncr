import './global/Globals.js';
import Data from '../../data/data.json';
import App from './App.js';

window._DATA = Data;
window.onload = () => window._APP = new App();

