import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatInputModule, FormsModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  @ViewChild('treeCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  disabled = false;
  thumbLabel = false;
  showTicks = false;

  angleInputField: number = 0; // Use number type
  skewInputField: number = 0; // Use number type

  aMax = 500;
  aMin = 0;
  aStep = 1;

  sMax = 90;
  sMin = -90;
  sStep = 1;

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
    console.log('draw on canvas called from tree');
    if (this.ctx) {
      const canvas = this.canvasRef.nativeElement;

      const context = this.ctx;

      const gradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 1.2,
        4,
        canvas.width / 2,
        canvas.height / 1.2,
        700
      );
      gradient.addColorStop(0, 'white');

      gradient.addColorStop(1, 'black');

      // let angleInputField = document.querySelector("#angle");
      // let skewInputField = document.querySelector("#angle-modifier");
      // console.log("inputFIeld", angleInputField);

      context.lineWidth = 1;
      context.strokeStyle = `rgb(255, 0, 0)`; // Red
      function drawTree() {
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.save();

        context.translate(canvas.width * 0.5, canvas.height);

        branch(Math.min(canvas.height, canvas.width) / 3);

        context.restore();
      }

      const branch = (length: number) => {
        let angle = (Math.PI / 500) * this.angleInputField;
        let skewangle = (Math.PI / 500) * this.skewInputField;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -length); // Draw the branch line
        context.stroke();
        if (length > 1.5) {
          // Continue branching if the length is greater than 2
          context.translate(0, -length);
          context.save();
          context.rotate(angle - skewangle); // Rotate right
          branch(length * 0.7); // Recursive call for the right branch
          context.restore();

          context.save();
          context.rotate(-angle - skewangle); // Rotate left
          branch(length * 0.7); // Recursive call for the left branch
          context.restore();
        }
      };
      drawTree();
    }
  }
}
