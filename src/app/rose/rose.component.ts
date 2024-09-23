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
  nMin = 3;
  showTicks = false;
  nStep = 0.1;
  thumbLabel = true;

  dMin = 1;
  dMax = 120;
  dStep = 1;

  n = 6.324;
  d = 74.238;
  numPointsInput = 1000;

  pMax = 5000;
  pMin = 3;
  pStep = 1;

  @ViewChild('roseCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    console.log('AFTER INIT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    window.requestAnimationFrame(() => this.drawOnCanvas());
  }

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth * 0.9; // 80% of the window's width
    canvas.height = window.innerHeight * 0.7; // 60% of the window's height
  }

  numPointsMod = (value: number) => {
    let normalizedInput = value / this.pMax;
    const output = Math.pow(normalizedInput, 3);
    let returnValue = Math.floor(output * 8000);
    if (returnValue < 3) returnValue = 3;
    return returnValue;
  };

  drawOnCanvas() {
    if (this.ctx) {
      let numPoints = this.numPointsMod(this.numPointsInput);
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

      for (let i = 1; i < numPoints; i += 1) {
        let k = i * this.d;

        let r =
          (Math.min(canvasHeight, canvasWidth) / 4) * Math.sin(this.n * k);
        let x = r * Math.cos(k) * 2;
        let y = 2 * r * Math.sin(k);
        pointObj[i] = [x, y];
      }

      for (let i = 1; i < numPoints - 1; i += 1) {
        let [currX, currY] = pointObj[i];
        let [nextX, nextY] = pointObj[i + 1];
        context.beginPath();
        context.moveTo(currX, currY);
        context.lineTo(nextX, nextY);

        context.lineWidth = 1;

        context.stroke();
      }

      let gradient2 = context.createLinearGradient(
        -canvasWidth / 2,
        canvasHeight / 2 - 35,
        canvasWidth / 2,
        canvasHeight / 2 - 8
      );

      gradient2.addColorStop(0, 'red');
      gradient2.addColorStop(0.16, 'orange');
      gradient2.addColorStop(0.33, 'yellow');
      gradient2.addColorStop(0.49, 'green');
      gradient2.addColorStop(0.66, 'blue');
      gradient2.addColorStop(0.82, 'indigo');
      gradient2.addColorStop(1, 'violet');

      context.fillStyle = gradient2;
      context.font = 'italic ' + 15 + 'pt Arial ';
      context.fillText(
        `n=${this.n}`,
        -canvasWidth / 2 + 20,
        canvasHeight / 2 - 35
      );
      context.fillText(
        `d=${this.d}`,
        -canvasWidth / 2 + 20,
        canvasHeight / 2 - 8
      );
      context.fillStyle = gradient2;
      context.font = 'italic ' + 15 + 'pt Arial ';
      context.fillText(
        `numPoints =${numPoints}`,
        -canvasWidth / 2 + (canvasWidth - 175),
        canvasHeight / 2 - 8
      );
      context.translate(-canvasWidth / 2, -canvasHeight / 2);
      this.numPointsInput += 0.0005;
      this.n += 0.000000005;
      this.d += 0.00000005;
      window.requestAnimationFrame(() => this.drawOnCanvas());
    }
  }
}
