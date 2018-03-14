import Petal from "./Petal";
import Split from "./Split";
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

  segment() {
    let p = this.primitives;
    let x = Math.abs(Math.sin(this.counter / 20) * 100);

    let c = this.segmentCanvasCtx;

    c.clearRect(0, 0, this.segmentCanvas.width, this.segmentCanvas.height);

    let color = 0;

    Petal(
      this.primitives,
      c,
      p.center.y * 0.55,
      widthAtHeight(p.segment, p.center.y * 0.6),
      "#" + this.primitives.colors[color],
      "white"
    );
    Fill(
      this.primitives,
      c,
      p.center.y * 0.6,
      "#" + this.primitives.colors[color]
    );

    color = 2;

    Split(
      this.primitives,
      c,
      p.center.y * 0.7,
      widthAtHeight(p.segment, p.center.y * 0.75) * 0.5,
      "#" + this.primitives.colors[color],
      "#" + this.primitives.colors[color + 1]
    );

    color = 4;

    Petal(
      this.primitives,
      c,
      p.center.y * 0.33,
      widthAtHeight(p.segment, p.center.y * 0.35),
      "#" + this.primitives.colors[color],
      "black"
    );
    Fill(
      this.primitives,
      c,
      p.center.y * 0.36,
      "#" + this.primitives.colors[color]
    );

    color = 8;

    Petal(
      this.primitives,
      c,
      p.center.y * 0.25,
      widthAtHeight(p.segment, p.center.y * 0.25) - 10,
      "#" + this.primitives.colors[color],
      "#" + this.primitives.colors[color + 2]
    );

    color = 12;

    Petal(
      this.primitives,
      c,
      p.center.y * 0.5 + 10,
      widthAtHeight(p.segment, p.center.y * 0.5) - 10,
      "#" + this.primitives.colors[color],
      "#" + this.primitives.colors[color + 2]
    );

    color = 14;

    c.fillStyle = "#" + this.primitives.colors[color];
    c.beginPath();
    c.arc(p.middle, p.center.y * 0.8, 10, 0, Math.PI * 2);
    c.fill();

    color = 15;

    c.fillStyle = "#" + this.primitives.colors[color];
    c.beginPath();
    c.arc(
      p.middle - widthAtHeight(p.segment, p.center.y * 0.9) * 0.25,
      p.center.y * 0.9,
      6,
      0,
      Math.PI * 2
    );
    c.fill();

    c.fillStyle = "#" + this.primitives.colors[color];
    c.beginPath();
    c.arc(
      p.middle + widthAtHeight(p.segment, p.center.y * 0.9) * 0.25,
      p.center.y * 0.9,
      6,
      0,
      Math.PI * 2
    );
    c.fill();
  }

  render() {
    let color = this.counter++;
    // this.primitives.colors = new ColorScheme()
    //   .from_hue(color)
    //   .scheme("tetrade")
    //   .colors();

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
