import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rose',
  standalone: true,
  imports: [CommonModule, MatSliderModule, FormsModule, MatInputModule],
  templateUrl: './rose.component.html',
  styleUrls: ['./rose.component.css'],
})
export class RoseComponent {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  disabled = false;
  nMax = 8;
  nMin = 4;
  showTicks = false;
  nStep = 0.0001;
  thumbLabel = false;

  dMin = 1;
  dMax = 120;
  dStep = 0.5;

  n = 6.324;
  d = 74.238;
  numPoints = 1000;

  @ViewChild('roseCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    console.log('AFTER INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    this.drawOnCanvas();
  }
  updateN(event: any): void {
    console.log('event in n', event);
    this.n = event.value;
  }

  // updateD(event: any): void {
  //   this.d = event.value;
  // }

  // updateNumPoints(event: any): void {
  //   this.numPoints = event.value;
  // }

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth * 0.8; // 80% of the window's width
    canvas.height = window.innerHeight * 0.6; // 60% of the window's height
  }

  drawOnCanvas() {
    if (this.ctx) {
      const canvas = this.canvasRef.nativeElement;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const context = this.ctx;
      context.translate(canvasWidth / 2, canvasHeight / 2);
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 700);
      gradient.addColorStop(0, 'white');

      gradient.addColorStop(1, 'black');

      context.fillStyle = gradient;
      context.fillRect(
        -canvasWidth / 2,
        -canvasHeight / 2,
        canvasWidth,
        canvasHeight
      );

      let pointObj: Record<number, [number, number]> = {};

      for (let i = 1; i < this.numPoints; i += 1) {
        let k = i * this.d;

        let r = 220 * Math.sin(this.n * k);
        let x = r * Math.cos(k) * 2;
        let y = 2 * r * Math.sin(k);
        pointObj[i] = [x, y];
      }

      for (let i = 1; i < this.numPoints - 1; i += 1) {
        let [currX, currY] = pointObj[i];
        let [nextX, nextY] = pointObj[i + 1];
        context.beginPath();
        context.moveTo(currX, currY);
        context.lineTo(nextX, nextY);

        context.lineWidth = 1;

        context.stroke();
      }
      context.translate(-canvasWidth / 2, -canvasHeight / 2);
    }
  }
}
