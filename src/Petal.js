export default function Petal(p, c, pos, size, color, stroke) {

    c.fillStyle = color;
    c.beginPath();
    c.moveTo(p.middle, pos);
    c.quadraticCurveTo(p.middle - size, pos, p.middle, (pos + size));
    c.quadraticCurveTo(p.middle + size, pos, p.middle, pos);
    c.fill();

    if (stroke) {
        c.strokeStyle = stroke;
        c.stroke();
    }

}
