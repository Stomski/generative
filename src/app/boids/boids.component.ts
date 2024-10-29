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
    let flock = Boid.newFlock(45, [width, height]);
    window.requestAnimationFrame(() => this.drawOnCanvas(flock));
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
        let alignmentVector = boid.alignment(flock);
        let cohesionVector = boid.cohesion(flock);
        boid.acceleration = boid.steer(alignmentVector, cohesionVector);

        // console.log('BOID ACCELERATION AFTER ALIGN?>>>>', boid.acceleration);
        boid.update(canvas.width, canvas.height);
        boid.show(context);
      });

      context.restore();
      window.requestAnimationFrame(() => this.drawOnCanvas(flock));
    }
  }
}
