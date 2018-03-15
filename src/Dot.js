import Utilities, { widthAtHeight } from "./Utilities";

export default function Dot(p, c, pos, size, color, stroke, count, dist) {
  count = count || 1;
  dist = dist || widthAtHeight(p.segment, pos) / count;
  for (let x = 0; x < count; x++) {
    c.beginPath();
    c.arc(
      p.middle - (count - 1) * dist / 2 + x * dist,
      pos,
      size,
      0,
      Math.PI * 2
    );
    c.fill();

    if (stroke) {
      c.strokeStyle = stroke;
      c.stroke();
    }
  }
}
