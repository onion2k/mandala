import "./mandala.css";
import Mandala from "./Mandala";

Math.TAU = Math.PI * 2;

let m;

function init() {
  m = new Mandala(document.body);
  animate();
}

function animate() {
  m.render();
  requestAnimationFrame(animate);
}

document.addEventListener("DOMContentLoaded", init);
