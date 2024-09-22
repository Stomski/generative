import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
interface TrackingItem {
  x: number;
  y: number;
  // add other properties as needed
}

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
      this.drawOnCanvas(this.radius, this.angle)
    );
  }

  radius: number = 100;
  angle: number = (Math.PI / 2) * 3;
  trackingArray: TrackingItem[] = [];

  drawOnCanvas(radius: number, angle: number) {
    /**
     *
     *
     *
     *
     *
     */
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      // reset background
      /**
       *
       *
       *
       *
       *
       */

      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      /**
       *
       *
       *
       *
       *
       */

      context.save();

      context.translate(canvas.width / 2, canvas.height / 2);

      /********************************************************************************** */
      //COLORS
      context.lineWidth = 1;
      context.strokeStyle = `rgb(255, 0, 0)`; // Red

      /************************** */

      //in order to store the path im gonna make an array of vertexs, then iterate at the end and draw a path

      const drawGeneration = (center: any, radius: number, angle: number) => {
        let x = 0;
        let y = 0;
        let previousX;
        let previousY;
        let numGenerations = 9;
        context.save();

        for (let i = 0; i < numGenerations; i++) {
          previousX = x;
          previousY = y;
          context.lineWidth = 1;

          context.beginPath();
          context.arc(previousX, previousY, radius, 0, Math.PI * 2);
          context.stroke();

          let n = i * 2 + 1;

          x += radius * Math.cos(n * angle);
          y += radius * Math.sin(n * angle);

          context.lineWidth = 2;

          context.beginPath();
          context.moveTo(previousX, previousY);
          context.lineTo(x, y);
          context.stroke();

          radius = radius / 2;

          if (i === numGenerations - 1) {
            this.trackingArray.push({ x: x, y: y });
          }

          // x += radius * Math.cos(n * angle);
          // y += radius * Math.sin(n * angle);
        }

        context.stroke();

        context.restore();
      };

      const drawTracer = () => {
        context.save();
        for (let i = 0; i < this.trackingArray.length; i++) {
          if (i === 0) {
            context.beginPath();
            context.moveTo(this.trackingArray[i].x, this.trackingArray[i].y);
          } else if (i === this.trackingArray.length - 1) {
            context.lineTo(this.trackingArray[i].x, this.trackingArray[i].y);
            context.stroke();
          } else {
            context.lineTo(this.trackingArray[i].x, this.trackingArray[i].y);
          }
        }
        context.restore();
      };
      drawGeneration(0, radius, angle);

      drawTracer();
      /********************************************************************************** */

      /**
       *
       *
       *
       *
       *
       */

      /********************************************************************************** */

      context.restore();
      /**
       *
       *
       *
       *
       *
       */

      /**
       *
       *
       *
       *
       *
       */
      this.angle -= Math.PI / 180;

      // this.radius++;
      if (this.radius > 300) this.radius = 200;

      /**
       *
       *
       *
       *
       *
       */
      window.requestAnimationFrame(() =>
        this.drawOnCanvas(this.radius, this.angle)
      );
    }
  }
}
