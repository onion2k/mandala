import './mandala.css';

let primitives;
let counter = 0;

Math.TAU = Math.PI * 2;

function widthAtHeight(h){

  let p = primitives;

  return (2 * h) * Math.tan((180 / p.segment) * (Math.PI / 180));

}

function fill(c, pos, color) {

    let p = primitives;
    
    let wah = widthAtHeight(pos);

    c.fillStyle = color;
    c.beginPath();
    c.moveTo(p.middle - (wah/2) - 5, pos);
    c.lineTo(p.middle + (wah/2) + 5, pos);
    c.lineTo(p.middle, 0);
    c.closePath();
    c.fill();

}

function petal(c, pos, size, color, stroke) {

    let p = primitives;

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

function segment() {

    let p = primitives;
    let x = Math.sin(counter++ / 10) * 50 + p.center.y / 2;

    let segmentCanvas = document.createElement('canvas');
    segmentCanvas.width  = p._width;
    segmentCanvas.height = p.radius;

    let segmentCanvasCtx = segmentCanvas.getContext('2d');

    segmentCanvasCtx.strokeStyle = 'white';
    segmentCanvasCtx.lineWidth = 2;
    segmentCanvasCtx.fillStyle = '#222222';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0, p.height * 0.5);
    segmentCanvasCtx.lineTo(p._width, p.height * 0.5);
    segmentCanvasCtx.lineTo(p.middle, 0);
    segmentCanvasCtx.closePath();
    // segmentCanvasCtx.fill();
    // segmentCanvasCtx.stroke();
    segmentCanvasCtx.clip();

    petal(segmentCanvasCtx, p.center.y * 0.55, widthAtHeight(p.center.y * 0.6), 'turquoise', 'white');
    fill(segmentCanvasCtx, p.center.y * 0.6, 'turquoise');

    petal(segmentCanvasCtx, p.center.y * 0.33, widthAtHeight(p.center.y * 0.35), 'black', 'black');
    fill(segmentCanvasCtx, p.center.y * 0.35, 'black');

    petal(segmentCanvasCtx, p.center.y * 0.25, widthAtHeight(p.center.y * 0.25) - 10, 'yellow');
    petal(segmentCanvasCtx, p.center.y * 0.5 + 10, widthAtHeight(p.center.y * 0.5) - 10, 'blue');

    segmentCanvasCtx.fillStyle = 'red';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width * 0.5, p.center.y * 0.75, 0, p.center.y * 0.9);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(p._width, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width * 0.5, p.center.y * 0.75, p._width, p.center.y * 0.9);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(p.middle, p.center.y * 0.8, 3, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(p.middle - (widthAtHeight(p.center.y * 0.9) * 0.25), p.center.y * 0.9, 3, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(p.middle + (widthAtHeight(p.center.y * 0.9) * 0.25), p.center.y * 0.9, 3, 0, Math.PI*2);
    segmentCanvasCtx.fill();


    return segmentCanvas;

}

function render() {

    let seg = segment();

    let p = primitives;
    let ctx = document.querySelector('canvas').getContext('2d');
    let s = (Math.TAU / p.segment) * 0.5;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,p.width,p.height);

    for (let i=0; i < p.segment; i++) {

        ctx.translate(p.center.x, p.center.y);
        ctx.rotate(s*2);
        ctx.drawImage(seg, -seg.width * 0.5, 0);
        ctx.translate(-p.center.x, -p.center.y);

    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(p.center.x, p.center.y , 3, 0, Math.PI*2);
    ctx.fill();

    requestAnimationFrame(render);

}

function init() {

  primitives = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      center: {
          x: document.body.clientWidth * 0.5,
          y: document.body.clientHeight * 0.5
      },
      radius: Math.min(document.body.clientWidth, document.body.clientHeight) * 0.5,
      segment: 16,
  };

  primitives._width = (2 * primitives.radius) * Math.tan((180 / primitives.segment) * (Math.PI / 180)) + 2;
  primitives.middle = primitives._width * 0.5;

  let canvas = document.createElement('canvas');
  canvas.width = primitives.width;
  canvas.height = primitives.height;

  document.body.appendChild(canvas);

  render();

}


document.addEventListener('DOMContentLoaded', init);
