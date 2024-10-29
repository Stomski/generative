import { Component, ViewChild, ElementRef } from '@angular/core';
import { Boid, Vec2 } from './boidsFunctions';

@Component({
  selector: 'app-boids',
  standalone: true,
  imports: [],
  templateUrl: './boids.component.html',
  styleUrl: './boids.component.css',
})
export class BoidsComponent {
  @ViewChild('boidsCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  setCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth * 0.9; // 80% of the window's width
    canvas.height = window.innerHeight * 0.7; // 60% of the window's height
    return [canvas.width, canvas.height];
  }
  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    let [width, height] = this.setCanvasSize();
    let flock = this.newFlock(10, [width, height]);
    window.requestAnimationFrame(() => this.drawOnCanvas(flock));
  }

  newFlock(size: number, canvasDimensions: number[]) {
    let flockArray = [];
    const halfWidth = canvasDimensions[0] / 2;
    const halfHeight = canvasDimensions[1] / 2;

    for (let i = 0; i < size; i++) {
      // Generate random positions within the specified range
      const randomX = Math.random() * (halfWidth * 2) - halfWidth; // Random value between -halfWidth and halfWidth
      const randomY = Math.random() * (halfHeight * 2) - halfHeight; // Random value between -halfHeight and halfHeight

      // Create a new Boid with the random position
      let newBoid = new Boid(new Vec2(randomX, randomY));
      flockArray.push(newBoid);
    }
    return flockArray;
  }

  drawOnCanvas(flock: Boid[]) {
    console.log('draw canvas called in boids');
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      /*
      above sets the canvas, fills a black background
      */

      flock.forEach((boid) => {
        boid.acceleration = boid.alignment(flock);
        boid.update(canvas.width, canvas.height);
        boid.show(context);
      });

      context.restore();
      window.requestAnimationFrame(() => this.drawOnCanvas(flock));
    }
  }
}
