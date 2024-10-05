import { Component, ElementRef, ViewChild } from '@angular/core';
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

  accel1 = new physics.Acceleration(0, 0.0);
  vel1 = new physics.Velocity(0.01, 0);

  radius1: number = 190;
  theta1: number = Math.PI * 0.99;
  mass1: number = 100;

  thing1 = new physics.Thing(this.pos1, this.accel1, this.vel1, this.mass1);

  /***************** */

  pos2 = new physics.Position(0, 0);
  accel2 = new physics.Acceleration(0, 0);
  vel2 = new physics.Velocity(0.0, 0);
  mass2: number = 40;

  radius2: number = 70;
  theta2: number = Math.PI / Math.floor(Math.random() * 100);

  thing2 = new physics.Thing(this.pos2, this.accel2, this.vel2, this.mass2);

  /*********** */

  bobSize: number = 10;
  frameCount: number = 0;
  pathArray: physics.Position[] = [];

  /*************************** */
  /********************************************** */
  /********************************************** */
  restart() {
    // Reset angles
    this.theta1 = Math.PI;
    this.theta2 = Math.PI / Math.floor(Math.random() * 100);

    // Reset velocities
    this.thing1.velocity.x = 0.01;
    this.thing2.velocity.x = 0.0;
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    // Reset the path
    this.pathArray = [];

    // Redraw the canvas
  }

  drawOnCanvas() {
    if (this.ctx) {
      const context = this.ctx;
      const canvas = this.canvasRef.nativeElement;

      // Background setup/reset
      context.save();
      context.fillStyle = 'rgb(255,255,255)';
      context.translate(canvas.width / 2, canvas.height / 2);
      context.fillRect(
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );

      // Calculate Bob 1 position
      this.thing1.position.x = this.radius1 * Math.sin(this.theta1);
      this.thing1.position.y = this.radius1 * Math.cos(this.theta1);

      // Calculate Bob 2 position based on Bob 1
      this.thing2.position.x =
        this.radius2 * Math.sin(this.theta2) + this.thing1.position.x;
      this.thing2.position.y =
        this.radius2 * Math.cos(this.theta2) + this.thing1.position.y;

      this.pathArray.push(
        new physics.Position(this.thing2.position.x, this.thing2.position.y)
      );

      // Draw Lines, SETUP
      context.beginPath();
      context.lineWidth = 0.5;

      // Line from center to Bob 1
      context.moveTo(0, 0);
      context.lineTo(this.thing1.position.x, this.thing1.position.y);

      // Line from Bob 1 to Bob 2
      context.moveTo(this.thing1.position.x, this.thing1.position.y);
      context.lineTo(this.thing2.position.x, this.thing2.position.y);

      context.stroke();

      // Draw Bob 1
      context.fillStyle = 'rgb(0,0,0)';
      context.fillRect(
        this.thing1.position.x - this.bobSize / 2,
        this.thing1.position.y - this.bobSize / 2,
        this.bobSize,
        this.bobSize
      );

      // Draw Bob 2
      context.fillStyle = 'rgb(255,0,0)';
      context.fillRect(
        this.thing2.position.x - this.bobSize / 2,
        this.thing2.position.y - this.bobSize / 2,
        this.bobSize,
        this.bobSize
      );

      //DRAW THE PATH
      context.lineWidth = 0.1;

      for (let i = 0; i < this.pathArray.length; i++) {
        if (i === 0) {
          context.beginPath();
          context.moveTo(this.pathArray[i].x, this.pathArray[i].y);
        } else if (i === this.pathArray.length - 1) {
          //at the end
          context.lineTo(this.pathArray[i].x, this.pathArray[i].y);
          context.stroke();
        } else {
          context.lineTo(this.pathArray[i].x, this.pathArray[i].y);
        }
      }

      // Update angles for the next frame

      let gravity: number = 0.98;
      let dt: number = 1;

      // Solve for acceleration 1
      let theta1top1 =
        -gravity * (2 * this.mass1 + this.mass2) * Math.sin(this.theta1);
      let theta1top2 =
        this.mass2 * gravity * Math.sin(this.theta1 - 2 * this.theta2);
      let theta1top3 =
        2 *
        Math.sin(this.theta1 - this.theta2) *
        this.mass2 *
        (this.thing2.velocity.x ** 2 * this.radius2 +
          this.thing1.velocity.x ** 2 *
            this.radius1 *
            Math.cos(this.theta1 - this.theta2));
      let theta1Bottom =
        this.radius1 *
        (2 * this.mass1 +
          this.mass2 -
          this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2));
      let thetaPrimePrime =
        (theta1top1 - theta1top2 - theta1top3) / theta1Bottom;
      this.thing1.acceleration.x = thetaPrimePrime;

      // Solve for acceleration 2

      let theta2top1 = 2 * Math.sin(this.theta1 - this.theta2);
      let theta2top2 =
        this.thing1.velocity.x ** 2 * this.radius1 * (this.mass1 + this.mass2) +
        gravity * (this.mass1 + this.mass2) * Math.cos(this.theta1) +
        this.thing2.velocity.x ** 2 *
          this.radius2 *
          this.mass2 *
          Math.cos(this.theta1 - this.theta2);
      let theta2Bottom =
        this.radius2 *
        (2 * this.mass1 +
          this.mass2 -
          this.mass2 * Math.cos(2 * this.theta1 - 2 * this.theta2));
      let theta2PrimePrime = (theta2top1 * theta2top2) / theta2Bottom;
      this.thing2.acceleration.x = theta2PrimePrime;

      // Update velocities
      this.thing1.velocity.x += this.thing1.acceleration.x * dt;
      this.thing2.velocity.x += this.thing2.acceleration.x * dt;

      // Update positions (angles)
      this.theta1 += this.thing1.velocity.x * dt;
      this.theta2 += this.thing2.velocity.x * dt;
      this.frameCount++;
      this.thing2.velocity.x *= 0.999;
      this.thing1.velocity.x *= 0.999;

      context.restore();
      window.requestAnimationFrame(() => this.drawOnCanvas());
    }
  }
}
