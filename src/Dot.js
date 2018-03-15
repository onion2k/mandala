import Utilities, { widthAtHeight } from "./Utilities";

export default function Dot(p, c, pos, size, color, stroke, count, dist) {
  count = count || 1;

  let arc = 360 / p.segment;
  let ang = arc / count;
  let r = Math.PI / 180;

  for (let i = 0; i < count; i++) {
    c.beginPath();

    let x = Math.sin((ang * i - arc / 2) * r) * pos + p.middle;
    let y = Math.cos((ang * i - arc / 2) * r) * pos;

    c.arc(x, y, size, 0, Math.PI * 2);
    c.fill();

    if (stroke) {
      c.strokeStyle = stroke;
      c.stroke();
    }
  }
}
