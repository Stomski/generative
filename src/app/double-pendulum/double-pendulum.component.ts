import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-double-pendulum',
  standalone: true,
  imports: [],
  templateUrl: './double-pendulum.component.html',
  styleUrl: './double-pendulum.component.css',
})
export class DoublePendulumComponent {
  @ViewChild('doublePendulumCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 800;
    canvas.height = 800;
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    window.requestAnimationFrame(() => this.drawOnCanvas());
  }
  drawOnCanvas() {
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;
      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}
