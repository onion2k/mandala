import Petal from "./Petal";
import Split from "./Split";
import Dot from "./Dot";

import Arch from "./Arch";

import { Clip, Fill, widthAtHeight } from "./Utilities";
import ColorScheme from "color-scheme";

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
      segment: 16,
      colors: new ColorScheme()
        .from_hue(Math.floor(Math.random() * 256))
        .scheme("tetrade")
        .colors()
        .map(i => {
          return "#" + i;
        })
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

    this.segmentCanvasCtx = this.segmentCanvas.getContext("2d");

    Clip(this.primitives, this.segmentCanvasCtx);

    this.counter = 0;

    el.appendChild(this.canvas);
  }

  change(e) {
    console.log(e.target.value);
  }

  segment() {
    let p = this.primitives;
    let colors = this.primitives.colors;
    let x = Math.abs(Math.sin(this.counter / 20) * 100);

    let c = this.segmentCanvasCtx;

    c.clearRect(0, 0, this.segmentCanvas.width, this.segmentCanvas.height);

    let color = 0;

    Petal(
      this.primitives,
      c,
      p.radius * 0.55,
      widthAtHeight(p.segment, p.radius * 0.6),
      colors[color],
      "white"
    );
    Fill(this.primitives, c, p.radius * 0.6, colors[color]);

    color = 2;

    Split(
      this.primitives,
      c,
      p.radius * 0.575,
      widthAtHeight(p.segment, p.radius * 0.75) * 0.5,
      colors[color],
      colors[color + 1]
    );

    color = 4;

    Petal(
      this.primitives,
      c,
      p.radius * 0.33,
      widthAtHeight(p.segment, p.radius * 0.37),
      colors[color],
      "black"
    );
    Fill(this.primitives, c, p.radius * 0.36, colors[color]);

    color = 8;

    Petal(
      this.primitives,
      c,
      p.radius * 0.3475,
      widthAtHeight(p.segment, p.radius * 0.275),
      colors[color],
      "black"
    );

    color = 10;

    Petal(
      this.primitives,
      c,
      p.radius * 0.25,
      widthAtHeight(p.segment, p.radius * 0.1),
      colors[color],
      "white"
    );

    color = 12;

    Petal(
      this.primitives,
      c,
      p.radius * 0.5 + 10,
      widthAtHeight(p.segment, p.radius * 0.5) - 10,
      colors[color],
      "black"
    );

    Arch(p, c, p.radius * 0.1, 100, "white", null, 1, 1.5);

    color = 14;

    Arch(
      p,
      c,
      p.radius * 0.485,
      10,
      colors[color],
      null,
      2 + Math.floor(Math.random() * 5),
      1.5
    );

    color = 15;

    Dot(
      p,
      c,
      p.radius * 0.8,
      8,
      colors[color],
      "white",
      1 + Math.floor(Math.random() * 4)
    );
    Dot(
      p,
      c,
      p.radius * 0.85,
      5,
      colors[color],
      "white",
      2 + Math.floor(Math.random() * 5)
    );
  }

  render() {
    let color = this.counter++;

    this.segment();

    let p = this.primitives;
    let ctx = this.canvas.getContext("2d");
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
  }
}
