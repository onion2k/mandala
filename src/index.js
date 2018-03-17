import "./mandala.css";
import Seeder from "./Seeder";
import Mandala from "./Mandala";

Math.TAU = Math.PI * 2;

let m;

function animate() {
  m.render();
  // requestAnimationFrame(animate);
}

function init() {
  m = new Mandala(document.body);
  animate();
}

document.addEventListener("DOMContentLoaded", init);
