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
  angle: number = -Math.PI / 2;
  numPoints: number = 50;

  drawOnCanvas(radius: number, angle: number, numPoints: number) {
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

      /**
       *
       *
       *
       *
       *
       */

      context.lineWidth = 1;
      context.strokeStyle = `rgb(255, 0, 0)`; // Red

      context.fillStyle = 'rgb(255,255,255)';
      context.fillRect(0, 0, 2, 2);

      context.fillStyle = 'rgb(0,0,0)';
      context.strokeStyle = `rgb(255, 0, 0)`; // Red

      context.beginPath();
      context.arc(0, 0, radius, 0, 2 * Math.PI);

      context.closePath();
      context.stroke();

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(radius * Math.cos(angle), radius * Math.sin(angle));

      context.stroke();

      context.moveTo(
        radius * 1.5 * Math.cos(angle),
        radius * 1.5 * Math.sin(angle)
      );

      context.beginPath();
      context.arc(
        radius * 1.5 * Math.cos(angle),
        radius * 1.5 * Math.sin(angle),
        radius / 2,
        0,
        2 * Math.PI
      );

      context.closePath();
      context.stroke();

      context.beginPath();
      //  context.lineTo()

      context.fillStyle = 'rgb(255,255,255)';

      // context.fillRect(
      //   radius * 1.5 * Math.cos(angle),
      //   radius * 1.5 * Math.sin(angle),
      //   2,
      //   2
      // );

      context.translate(
        radius * 1.5 * Math.cos(angle),
        radius * 1.5 * Math.sin(angle)
      );
      context.fillRect(0, 0, 2, 2);

      context.beginPath();

      context.moveTo(0, 0);
      context.lineTo(
        radius * 0.5 * Math.cos(angle * 2 + Math.PI / 2),
        radius * 0.5 * Math.sin(angle * 2 + Math.PI / 2)
      );
      context.stroke();

      /**
       *
       *
       *
       *
       *
       */
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
        this.drawOnCanvas(this.radius, this.angle, this.numPoints)
      );
    }
  }
}
