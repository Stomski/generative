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
    this.drawOnCanvas();
  }

  drawOnCanvas() {
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
}
