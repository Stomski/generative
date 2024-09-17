import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";

import { CommonModule } from "@angular/common";

@Component({
  selector: "app-rose",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./rose.component.html",
  styleUrls: ["./rose.component.css"],
})
export class RoseComponent {
  @ViewChild("roseCanvas", { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d");
    this.setCanvasSize();
  }

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
      gradient.addColorStop(0, "white");

      gradient.addColorStop(1, "black");

      let n = 6.324;
      let d = 74.238;
      let numPoints = 1000;

      context.fillStyle = gradient;
      context.fillRect(
        -canvasWidth / 2,
        -canvasHeight / 2,
        canvasWidth,
        canvasHeight
      );

      let pointObj: Record<number, [number, number]> = {};

      for (let i = 1; i < numPoints; i += 1) {
        let k = i * d;

        let r = 220 * Math.sin(n * k);
        let x = r * Math.cos(k) * 2;
        let y = 2 * r * Math.sin(k);
        pointObj[i] = [x, y];
      }

      for (let i = 1; i < numPoints - 1; i += 1) {
        let hue = i / 699; // Hue varies from 0 to 1 across the loop
        let saturation = 1; // Full saturation
        let brightness = 1; // Full brightness

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
