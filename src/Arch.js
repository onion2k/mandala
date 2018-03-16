import Utilities, { widthAtHeight } from "./Utilities";

export default function Arch(p, c, pos, size, color, stroke, count, width) {
  count = count || 1;

  let arc = 360 / p.segment;
  let ang = arc / count;
  let r = Math.PI / 180;

  let x, y, a;

  c.fillStyle = color;

  for (let i = 0; i < count; i++) {
    c.beginPath();

    a = (ang * i - arc / 2 + ang / 2 - width / 2) * r;

    x = Math.sin(a) * pos + p.middle;
    y = Math.cos(a) * pos;
    c.moveTo(x, y);

    x = Math.sin(a) * (pos + size) + p.middle;
    y = Math.cos(a) * (pos + size);
    c.lineTo(x, y);

    a = (ang * i - arc / 2 + ang / 2 + width / 2) * r;
    x = Math.sin(a) * (pos + size) + p.middle;
    y = Math.cos(a) * (pos + size);
    c.lineTo(x, y);

    x = Math.sin(a) * pos + p.middle;
    y = Math.cos(a) * pos;
    c.lineTo(x, y);

    c.closePath();
    c.fill();

    if (stroke) {
      c.strokeStyle = stroke;
      c.stroke();
    }
  }
}
