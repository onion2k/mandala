import Petal from "./Petal";
import Split from "./Split";
import Dot from "./Dot";

import Arch from "./Arch";

import { Clip, Fill, widthAtHeight } from "./Utilities";
import ColorScheme from "color-scheme";

export default class Mandala {
  constructor(el) {
    this.el = el;
    this.primitives = {};

    this.canvas = document.createElement("canvas");
    this.segmentCanvas = document.createElement("canvas");

    this.calculateSize(el);

    this.segmentCanvasCtx = this.segmentCanvas.getContext("2d");

    Clip(this.primitives, this.segmentCanvasCtx);

    this.counter = 0;

    el.appendChild(this.canvas);
  }

  calculateSize(el) {
    this.primitives = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
      center: {
        x: this.el.clientWidth * 0.5,
        y: this.el.clientHeight * 0.5
      },
      radius: Math.min(this.el.clientWidth, this.el.clientHeight) * 0.5,
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

    this.canvas.width = this.primitives.width;
    this.canvas.height = this.primitives.height;

    this.segmentCanvas.width = this.primitives._width;
    this.segmentCanvas.height = this.primitives.radius;
  }

  change(c) {
    this.primitives.colors = new ColorScheme()
      .from_hue(c / 32 * 256)
      .scheme("tetrade")
      .colors()
      .map(i => {
        return "#" + i;
      });
    this.render();
  }

  resize() {
    this.calculateSize();
    Clip(this.primitives, this.segmentCanvasCtx);
  }

  segment() {
    let p = this.primitives;
    let colors = this.primitives.colors;
    let x = Math.abs(Math.sin(this.counter / 20) * 100);

    let c = this.segmentCanvasCtx;

    c.clearRect(0, 0, this.segmentCanvas.width, this.segmentCanvas.height);

    let patternCanvas = document.createElement("canvas");
    patternCanvas.width = 100;
    patternCanvas.height = 100;
    let pctx = patternCanvas.getContext("2d");

    pctx.fillStyle = "white";
    pctx.fillRect(0, 0, 100, 100);

    pctx.lineWidth = 5;

    let color = 1;

    for (let b = 0; b < 20; b++) {
      pctx.fillStyle = b % 2 === 0 ? colors[color] : colors[color + 1];
      pctx.beginPath();
      pctx.moveTo(-100 + b * 10, 0);
      pctx.bezierCurveTo(-100 + b * 10, 100, 0 + b * 10, 0, 0 + b * 10, 100);
      pctx.lineTo(100 + b * 10, 100);
      pctx.lineTo(100 + b * 10, 0);
      pctx.closePath();
      pctx.fill();
    }

    let pattern = c.createPattern(patternCanvas, "repeat");

    Petal(
      this.primitives,
      c,
      p.radius * 0.65,
      widthAtHeight(p.segment, p.radius * 0.75),
      pattern,
      "white"
    );
    Fill(this.primitives, c, p.radius * 0.7, pattern);

    color = 1;

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

    let dotCanvas = document.createElement("canvas");
    dotCanvas.width = 100;
    dotCanvas.height = 100;
    let dotctx = dotCanvas.getContext("2d");

    dotctx.fillStyle = "white";
    dotctx.fillRect(0, 0, 100, 100);

    dotctx.fillStyle = colors[color];

    dotctx.lineWidth = 5;
    for (let b = 0; b < 110; b++) {
      dotctx.beginPath();
      dotctx.arc(5 + (b % 10) * 10, Math.floor(b / 10) * 10, 4, 0, Math.PI * 2);
      dotctx.fill();
      dotctx.closePath();
    }

    let dotpattern = c.createPattern(dotCanvas, "repeat");

    Petal(
      this.primitives,
      c,
      p.radius * 0.5 + 10,
      widthAtHeight(p.segment, p.radius * 0.5) - 10,
      dotpattern,
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

    // color = 15;

    Dot(p, c, p.radius * 0.95, 10, colors[color], "white", 1);
    Dot(p, c, p.radius * 0.925, 6, colors[color], "white", 2);
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
