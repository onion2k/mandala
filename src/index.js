import './mandala.css';

let primitives;
Math.TAU = Math.PI * 2;

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

function petal(ctx, pos, size, color) {

    let p = primitives;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(p.middle, pos);
    ctx.quadraticCurveTo(p.middle - size, pos, p.middle, (pos + size));
    ctx.quadraticCurveTo(p.middle + size, pos, p.middle, pos);
    ctx.fill();

}

let counter = 0;

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

    segmentCanvasCtx.fillStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(p.middle, p.center.y * 0.25);
    segmentCanvasCtx.quadraticCurveTo(0, p.center.y * 0.5, p.middle, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width, p.center.y * 0.5, p.middle, p.center.y * 0.25);
    segmentCanvasCtx.fill();

    petal(segmentCanvasCtx, x, -100, 'yellow');

    // segmentCanvasCtx.fillStyle = 'yellow';
    // segmentCanvasCtx.beginPath();
    // segmentCanvasCtx.moveTo(p.middle, p.center.y * 0.5);
    // segmentCanvasCtx.quadraticCurveTo(p.middle - 50, p.center.y * 0.75, p.middle, p.center.y * 0.75);
    // segmentCanvasCtx.quadraticCurveTo(p.middle + 50, p.center.y * 0.75, p.middle, p.center.y * 0.5);
    // segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'blue';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width/2, p.center.y * 0.75, 0, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(p._width, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width/2, p.center.y * 0.75, p._width, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'orange';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(p._width/2, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(p._width/2 - 50, p.center.y * 0.75, p._width/2, p.center.y);
    segmentCanvasCtx.quadraticCurveTo(p._width/2 + 50, p.center.y * 0.75, p._width/2, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.strokeStyle = 'white';
    segmentCanvasCtx.lineWidth = 2;
    segmentCanvasCtx.fillStyle = 'red';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(p.middle, p.center.y * 0.3);
    segmentCanvasCtx.quadraticCurveTo(p.middle + 20, p.center.y * 0.3, p.middle, p.center.y * 0.2);
    segmentCanvasCtx.quadraticCurveTo(p.middle - 20, p.center.y * 0.3, p.middle, p.center.y * 0.3);
    segmentCanvasCtx.fill();
    segmentCanvasCtx.stroke();

    segmentCanvasCtx.strokeStyle = 'white';
    segmentCanvasCtx.lineWidth = 1;
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0,p.center.y * 0.5 - 20);
    segmentCanvasCtx.lineTo(p._width,p.center.y * 0.5 -20);
    segmentCanvasCtx.stroke();

    segmentCanvasCtx.fillStyle = 'cyan';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(p._width * 0.25, p.center.y - 15, 3, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'cyan';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(p._width * 0.75, p.center.y - 15, 3, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    let widthAtHeight = (2 * (p.center.y * 0.75)) * Math.tan((180 / primitives.segment) * (Math.PI / 180));
    let dotx = (p.middle - widthAtHeight/2) + (counter % widthAtHeight);
    console.log(dotx, widthAtHeight)
    segmentCanvasCtx.fillStyle = 'red';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(dotx, p.center.y * 0.75, 5, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    return segmentCanvas;

}

function render(){

    let seg = segment();

    let p = primitives;
    let ctx = document.querySelector('canvas').getContext('2d');
    let s = (Math.TAU / p.segment) * 0.5;

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,p.width,p.height);

    for (let i=0; i < p.segment; i++) {

        ctx.translate(p.center.x, p.center.y);
        ctx.rotate(s*2);
        ctx.drawImage(seg, -seg.width * 0.5, 0);
        ctx.translate(-p.center.x,-p.center.y);

    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(p.center.x,p.center.y, 3, 0, Math.PI*2);
    ctx.fill();

    requestAnimationFrame(render);

}

document.addEventListener('DOMContentLoaded', init);
