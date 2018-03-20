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
  window.addEventListener("resize", () => {
    m.resize();
    m.render();
  });
  let s = new Seeder(document.getElementById("seed"), m.change.bind(m));
  s.add(document.body, "click");
  animate();
}

document.addEventListener("DOMContentLoaded", init);
