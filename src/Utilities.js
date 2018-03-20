export function widthAtHeight(segments, h) {
  return 2 * h * Math.tan(180 / segments * (Math.PI / 180));
}

export function Clip(p, c) {
  c.strokeStyle = "white";
  c.lineWidth = 2;
  c.fillStyle = "#222222";
  c.beginPath();
  c.moveTo(0, p.radius);
  c.lineTo(p._width, p.radius);
  c.lineTo(p.middle, 0);
  c.closePath();
  c.clip();
}

export function Fill(p, c, pos, color) {
  let wah = widthAtHeight(p.segment, pos);
  c.fillStyle = color;
  c.beginPath();
  c.moveTo(p.middle - wah / 2 - 5, pos);
  c.lineTo(p.middle + wah / 2 + 5, pos);
  c.lineTo(p.middle, 0);
  c.closePath();
  c.fill();
}
