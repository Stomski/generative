import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-bouncing-ball',
  standalone: true,
  imports: [],
  templateUrl: './bouncing-ball.component.html',
  styleUrl: './bouncing-ball.component.css',
})
export class BouncingBallComponent {
  @ViewChild('bounceCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    this.drawOnCanvas();
  }

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth * 0.9; // 80% of the window's width
    canvas.height = window.innerHeight * 0.7; // 60% of the window's height
  }

  drawOnCanvas() {
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;
      // Background setup/reset
      context.save();
      context.fillStyle = 'rgb(0,0,0)';
      context.translate(canvas.width / 2, canvas.height / 2);
      context.fillRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
    }
  }
}
