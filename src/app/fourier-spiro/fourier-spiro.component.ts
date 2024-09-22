import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fourier-spiro',
  standalone: true,
  imports: [],
  templateUrl: './fourier-spiro.component.html',
  styleUrl: './fourier-spiro.component.css',
})
export class FourierSpiroComponent {
  @ViewChild('fSpiroCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth * 0.9; // 80% of the window's width
    canvas.height = window.innerHeight * 0.7; // 60% of the window's height
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    window.requestAnimationFrame(() =>
      this.drawOnCanvas(this.radius, this.angle, this.numPoints)
    );
  }

  radius: number = 100;
  angle: number = 0;
  numPoints: number = 50;

  drawOnCanvas(radius: number, angle: number, numPoints: number) {
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.save();

      context.translate(canvas.width / 2, canvas.height / 2);
      context.lineWidth = 1;
      context.strokeStyle = `rgb(255, 0, 0)`; // Red

      context.fillStyle = 'rgb(255,255,255)';
      context.fillRect(0, 0, 2, 2);
      let numPoints = 50;

      function drawcircle(numPoints: number, radius: number) {
        for (let i = 0; i < numPoints; i++) {
          let x = radius * Math.cos((Math.PI * 2 * i) / numPoints);
          let y = radius * Math.sin((Math.PI * 2 * i) / numPoints);
          let lastX = radius * Math.cos((Math.PI * 2 * i - 1) / numPoints);
          let lastY = radius * Math.sin((Math.PI * 2 * i - 1) / numPoints);
          if (i === 0) {
            console.log('loop start');
            context.beginPath();
            context.moveTo(x, y);
          } else if (i === numPoints - 1) {
            console.log('loopend', window.requestAnimationFrame);
            context.lineTo(lastX, lastY);
            context.closePath();
            context.stroke();
          } else {
            context.fillRect(x, y, 1, 1);
            context.lineTo(lastX, lastY);
          }
        }
      }
      drawcircle(numPoints, radius);

      context.restore();
    }

    this.radius++;
    window.requestAnimationFrame(() =>
      this.drawOnCanvas(this.radius, this.angle, this.numPoints)
    );
  }
}
