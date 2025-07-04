import {md} from './Prototypes/index.js';
import './Log.js';

/**
 * create markdown from string
 *
 * @returns {String}
 */
String.prototype.md = md;

// debug
process.env?.DEBUG ? process.env?.DEBUG === 'true' ? global.DEBUG = true : null : null;
process.env?.DEBUG ? process.env?.DEBUG === 'false' ? global.DEBUG = false : null : null;

// environment
process.env?.ENV ? process.env?.ENV === 'development' || process.env?.ENV === 'production' ? global.ENVIRONMENT = process.env?.ENV : null : null;
!global.ENVIRONMENT ? global.ENVIRONMENT = 'development' : null;
