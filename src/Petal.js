export default function Petal(p, c, pos, size, color, stroke, offset) {
  offset = offset || 0;

  c.fillStyle = color;
  c.beginPath();
  c.moveTo(p.middle + offset, pos);
  c.quadraticCurveTo(
    p.middle - size + offset,
    pos,
    p.middle + offset,
    pos + size
  );
  c.quadraticCurveTo(p.middle + size + offset, pos, p.middle + offset, pos);
  c.fill();

  if (offset) {
    // c.beginPath();
    // c.moveTo(p.middle - offset, pos);
    // c.quadraticCurveTo(
    //   p.middle - size - offset,
    //   pos,
    //   p.middle - offset,
    //   pos + size
    // );
    // c.quadraticCurveTo(p.middle + size - offset, pos, p.middle - offset, pos);
    // c.fill();
  }

  if (stroke) {
    c.strokeStyle = stroke;
    c.stroke();
  }
}
