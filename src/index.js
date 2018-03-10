import './mandala.css';

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
        segment: 16,
    };

    console.log(primitives);
    
    let canvas = document.createElement('canvas');
    canvas.width = primitives.width;
    canvas.height = primitives.height;

    document.body.appendChild(canvas);

    render();

}

function segment() {

    let p = primitives;

    let width = 85;

    let segmentCanvas = document.createElement('canvas');
    segmentCanvas.width  = width;
    segmentCanvas.height = p.height / 2;

    let segmentCanvasCtx = segmentCanvas.getContext('2d');

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0, p.height/2);
    segmentCanvasCtx.lineTo(width, p.height/2);
    segmentCanvasCtx.lineTo(width/2, 0);
    segmentCanvasCtx.closePath();
    segmentCanvasCtx.clip();

    segmentCanvasCtx.fillStyle = 'green';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, 0);
    segmentCanvasCtx.quadraticCurveTo(0, p.center.y * 0.75, width/2, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, 0);
    segmentCanvasCtx.quadraticCurveTo(width, p.center.y * 0.75, width/2, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'yellow';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, 100);
    segmentCanvasCtx.quadraticCurveTo(width/2 - 50, p.center.y * 0.75, width/2, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, 100);
    segmentCanvasCtx.quadraticCurveTo(width/2 + 50, p.center.y * 0.75, width/2, p.center.y * 0.75);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.fillStyle = 'orange';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(width/2 - 50, p.center.y * 0.75, width/2, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width/2, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(width/2 + 50, p.center.y * 0.75, width/2, p.center.y);
    segmentCanvasCtx.fill();


    segmentCanvasCtx.fillStyle = 'blue';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(width/2, p.center.y * 0.75, 0, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(width, p.center.y * 0.75);
    segmentCanvasCtx.quadraticCurveTo(width/2, p.center.y * 0.75, width, p.center.y);
    segmentCanvasCtx.fill();

    segmentCanvasCtx.strokeStyle = 'white';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.moveTo(0,p.center.y/2 - 20);
    segmentCanvasCtx.lineTo(width,p.center.y/2-20);
    segmentCanvasCtx.stroke();


    segmentCanvasCtx.fillStyle = 'pink';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(width/2, p.center.y * 0.25, 5, 0, Math.PI*2);
    segmentCanvasCtx.fill();


    segmentCanvasCtx.fillStyle = 'red';
    segmentCanvasCtx.beginPath();
    segmentCanvasCtx.arc(width/2, p.center.y * 0.75, 5, 0, Math.PI*2);
    segmentCanvasCtx.fill();

    return segmentCanvas;

}

function render(){

    let seg = segment();

    let p = primitives;
    let ctx = document.querySelector('canvas').getContext('2d');
    let s = (Math.TAU / p.segment) / 2;

    ctx.strokeStyle = 'white';
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
