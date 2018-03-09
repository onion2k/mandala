import './mandala.scss';

let primitives;
Math.TAU = Math.PI * 2;

function init() {

    primitives = {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
        center: {
            x: document.body.clientWidth / 2,
            y: document.body.clientHeight / 2
        },
        radius: Math.min(document.body.clientWidth, document.body.clientHeight) * 0.5,
        segment: 36,
    }
    
    let canvas = document.createElement('canvas');
    canvas.width = primitives.width;
    canvas.height = primitives.height;

    document.body.appendChild(canvas);

    render();

}

function segment() {

    let p = primitives;

    let segmentCanvas = document.createElement('canvas');
    segmentCanvas.width  = 200;
    segmentCanvas.height = p.height;

    let segmentCanvasCtx = segmentCanvas.getContext('2d');

    segmentCanvasCtx.fillStyle = 'red';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(100, 100);
    segmentCanvasCtx.quadraticCurveTo(50, p.center.y * 0.75, 100, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(100, 100);
    segmentCanvasCtx.quadraticCurveTo(150, p.center.y * 0.75, 100, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'green';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(100, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(50, p.center.y * 0.75, 100, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(100, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(150, p.center.y * 0.75, 100, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.strokeStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(100, p.center.y/2, 5, 0, Math.PI*2);
    segmentCanvasCtx.stroke();

    return segmentCanvas;

}

function render(){

    let seg = segment();

    let p = primitives;
    let ctx = document.querySelector('canvas').getContext('2d');
    let s = (Math.TAU / p.segment) / 2;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,p.width,p.height);

    for (let x=0; x < p.segment; x++) {

        ctx.translate(p.center.x, p.center.y);
        ctx.rotate(s*2);
        ctx.drawImage(seg, -seg.width/2, 0);
        ctx.translate(-p.center.x,-p.center.y);

    }

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(p.center.x,p.center.y, 3, 0, Math.PI*2);
    ctx.fill();
}

document.addEventListener('DOMContentLoaded', init);
