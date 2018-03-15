export default function Dot(p, c, pos, size, color, stroke) {

    c.beginPath();
    c.arc(p.middle, pos, size, 0, Math.PI * 2);
    c.fill();
    
    if (stroke){
      c.strokeStyle = stroke;
      c.stroke();
    }

}