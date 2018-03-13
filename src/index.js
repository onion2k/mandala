import './mandala.css';

import Mandala from './Mandala';

Math.TAU = Math.PI * 2;

function init() {
    let m = new Mandala(document.body);
}

document.addEventListener('DOMContentLoaded', init);
