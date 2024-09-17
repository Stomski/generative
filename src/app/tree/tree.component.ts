import { Component, ElementRef, ViewChild, AfterViewInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-tree",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.css"],
})
export class TreeComponent {
  @ViewChild("treeCanvas", { static: false })
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
    console.log("draw on canvas called from tree");
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
      gradient.addColorStop(0, "white");

      gradient.addColorStop(1, "black");

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
        branch(canvas.height / 2.2);
        context.restore();
      }

      function branch(length: number) {
        let angle = Math.PI / 500;
        let skewangle = 1;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -length); // Draw the branch line
        context.stroke();
        if (length > 2) {
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
      }
      drawTree();
    }
  }
}
