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
  new Seeder(document.getElementById("seed"), m.change);
  animate();
}

document.addEventListener("DOMContentLoaded", init);
