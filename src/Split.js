export default function Split(p, c, pos, size, color, stroke) {
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(0, pos);
  c.quadraticCurveTo(p._width * 0.5, pos, 0, pos + size);
  c.fill();
  if (stroke) {
    c.strokeStyle = stroke;
    c.stroke();
  }
  c.beginPath();
  c.moveTo(p._width, pos);
  c.quadraticCurveTo(p._width * 0.5, pos, p._width, pos + size);
  c.fill();
  if (stroke) {
    c.strokeStyle = stroke;
    c.stroke();
  }
}
