import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as physics from '../physics/physics';

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

  /********************************************** */
  //VARIABLES

  pos1 = new physics.Position(0, 0);
  accel1 = new physics.Acceleration(0.04, 0.02);
  vel1 = new physics.Velocity(0, 0);

  thing1 = new physics.Thing(this.pos1, this.accel1, this.vel1, 10);

  /********************************************** */

  pos2 = new physics.Position(0, 0);
  accel2 = new physics.Acceleration(0, 0);
  vel2 = new physics.Velocity(0, 0);

  thing2 = new physics.Thing(this.pos2, this.accel2, this.vel2, 10);

  /********************************************** */
  /********************************************** */
  /********************************************** */

  drawOnCanvas() {
    if (this.ctx) {
      /********************************************** */

      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      /************************************************************ */
      //background setup/reset

      context.fillStyle = 'rgb(255,200,0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);

      /************************************************************ */

      /************************************************************ */

      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(this.thing1.position.x, this.thing1.position.y, 4, 4);
      context.stroke();

      this.thing1.position.x += this.thing1.velocity.x;
      this.thing1.position.y += this.thing1.velocity.y;

      this.thing1.velocity.x += this.thing1.acceleration.x;
      this.thing1.velocity.y += this.thing1.acceleration.y;

      /************************************************************ */
      /************************************************************ */
      /************************************************************ */
      //INFINITE CANVAS

      if (
        this.thing1.position.x > canvas.width / 2 ||
        this.thing1.position.x < -canvas.width / 2
      ) {
        console.log('if triggeeres');
        this.thing1.position.x *= -1;
      }
      if (
        this.thing1.position.y > canvas.height / 2 ||
        this.thing1.position.y < -canvas.height / 2
      ) {
        console.log('if triggeeres');
        this.thing1.position.y *= -1;
      }
      /************************************************************ */
      context.restore();
      window.requestAnimationFrame(() => this.drawOnCanvas());
    }
  }
}
