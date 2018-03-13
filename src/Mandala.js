import Petal from "./Petal";
import { Clip, Fill, widthAtHeight } from "./Utilities";

export default class Mandala {
  constructor(el) {
    this.primitives = {
      width: el.clientWidth,
      height: el.clientHeight,
      center: {
        x: el.clientWidth * 0.5,
        y: el.clientHeight * 0.5
      },
      radius: Math.min(el.clientWidth, el.clientHeight) * 0.5,
      segment: 16
    };

    this.primitives._width =
      2 *
        this.primitives.radius *
        Math.tan(180 / this.primitives.segment * (Math.PI / 180)) +
      2;
    this.primitives.middle = this.primitives._width * 0.5;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.primitives.width;
    this.canvas.height = this.primitives.height;

    this.segmentCanvas = document.createElement("canvas");
    this.segmentCanvas.width = this.primitives._width;
    this.segmentCanvas.height = this.primitives.radius;

    this.counter = 0;

    el.appendChild(this.canvas);

    this.render();
  }

  segment() {
    let p = this.primitives;
    let x = Math.sin(this.counter++ / 10) * 50 + p.center.y / 2;

    let c = this.segmentCanvas.getContext("2d");

    Clip(this.primitives, c);
    Petal(
      this.primitives,
      c,
      p.center.y * 0.55,
      widthAtHeight(p.segment, p.center.y * 0.6),
      "turquoise",
      "white"
    );
    Fill(this.primitives, c, p.center.y * 0.6, "turquoise");

    Petal(
      this.primitives,
      c,
      p.center.y * 0.33,
      widthAtHeight(p.segment, p.center.y * 0.35),
      "black",
      "black"
    );
    Fill(this.primitives, c, p.center.y * 0.35, "black");

    Petal(
      this.primitives,
      c,
      p.center.y * 0.25,
      widthAtHeight(p.segment, p.center.y * 0.25) - 10,
      "yellow"
    );
    Petal(
      this.primitives,
      c,
      p.center.y * 0.5 + 10,
      widthAtHeight(p.segment, p.center.y * 0.5) - 10,
      "blue"
    );

    c.fillStyle = "red";
    c.beginPath();
    c.moveTo(0, p.center.y * 0.75);
    c.quadraticCurveTo(p._width * 0.5, p.center.y * 0.75, 0, p.center.y * 0.9);
    c.fill();

    c.beginPath();
    c.moveTo(p._width, p.center.y * 0.75);
    c.quadraticCurveTo(
      p._width * 0.5,
      p.center.y * 0.75,
      p._width,
      p.center.y * 0.9
    );
    c.fill();

    c.fillStyle = "white";
    c.beginPath();
    c.arc(p.middle, p.center.y * 0.8, 3, 0, Math.PI * 2);
    c.fill();

    c.fillStyle = "white";
    c.beginPath();
    c.arc(
      p.middle - widthAtHeight(p.segment, p.center.y * 0.9) * 0.25,
      p.center.y * 0.9,
      3,
      0,
      Math.PI * 2
    );
    c.fill();

    c.fillStyle = "white";
    c.beginPath();
    c.arc(
      p.middle + widthAtHeight(p.segment, p.center.y * 0.9) * 0.25,
      p.center.y * 0.9,
      3,
      0,
      Math.PI * 2
    );
    c.fill();
  }

  render() {
    this.segment();

    let p = this.primitives;
    let ctx = document.querySelector("canvas").getContext("2d");
    let s = Math.TAU / p.segment * 0.5;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, p.width, p.height);

    for (let i = 0; i < p.segment; i++) {
      ctx.translate(p.center.x, p.center.y);
      ctx.rotate(s * 2);
      ctx.drawImage(this.segmentCanvas, -this.segmentCanvas.width * 0.5, 0);
      ctx.translate(-p.center.x, -p.center.y);
    }

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(p.center.x, p.center.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // requestAnimationFrame(this.render.bind(this));
  }
}
