import Petal from './Petal';
import { widthAtHeight } from './Utilities';

export default class Mandala {

    constructor(el){

        this.primitives = {
            width: el.clientWidth,
            height: el.clientHeight,
            center: {
                x: el.clientWidth * 0.5,
                y: el.clientHeight * 0.5
            },
            radius: Math.min(el.clientWidth, el.clientHeight) * 0.5,
            segment: 16,
        };

        this.primitives._width = (2 * this.primitives.radius) * Math.tan((180 / this.primitives.segment) * (Math.PI / 180)) + 2;
        this.primitives.middle = this.primitives._width * 0.5;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.primitives.width;
        this.canvas.height = this.primitives.height;

        this.counter = 0;

        el.appendChild(this.canvas);

        this.render();

    }

    fill(c, pos, color) {
    
        let p = this.primitives;
        
        let wah = widthAtHeight(p.segment, pos);
    
        c.fillStyle = color;
        c.beginPath();
        c.moveTo(p.middle - (wah/2) - 5, pos);
        c.lineTo(p.middle + (wah/2) + 5, pos);
        c.lineTo(p.middle, 0);
        c.closePath();
        c.fill();

    }

    segment() {

        let p = this.primitives;
        let x = Math.sin(this.counter++ / 10) * 50 + p.center.y / 2;
    
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
    
        Petal(this.primitives, segmentCanvasCtx, p.center.y * 0.55, widthAtHeight(p.segment, p.center.y * 0.6), 'turquoise', 'white');
        this.fill(segmentCanvasCtx, p.center.y * 0.6, 'turquoise');
    
        Petal(this.primitives, segmentCanvasCtx, p.center.y * 0.33, widthAtHeight(p.segment, p.center.y * 0.35), 'black', 'black');
        this.fill(segmentCanvasCtx, p.center.y * 0.35, 'black');
    
        Petal(this.primitives, segmentCanvasCtx, p.center.y * 0.25, widthAtHeight(p.segment, p.center.y * 0.25) - 10, 'yellow');
        Petal(this.primitives, segmentCanvasCtx, p.center.y * 0.5 + 10, widthAtHeight(p.segment, p.center.y * 0.5) - 10, 'blue');
    
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
        segmentCanvasCtx.arc(p.middle - (widthAtHeight(p.segment, p.center.y * 0.9) * 0.25), p.center.y * 0.9, 3, 0, Math.PI*2);
        segmentCanvasCtx.fill();
    
        segmentCanvasCtx.fillStyle = 'white';
        segmentCanvasCtx.beginPath();
        segmentCanvasCtx.arc(p.middle + (widthAtHeight(p.segment, p.center.y * 0.9) * 0.25), p.center.y * 0.9, 3, 0, Math.PI*2);
        segmentCanvasCtx.fill();
    
        return segmentCanvas;
    
    }

    render() {

        let seg = this.segment();

        let p = this.primitives;
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
    
        requestAnimationFrame(this.render.bind(this));
    

    }

}