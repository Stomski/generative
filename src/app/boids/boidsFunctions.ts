/*
So this is an exciting project for me, I have always marveled at these shapes and to direct my computer towards creating them is an exciting step.

these classes will define the boid object,

the accelerations and vectors for the objects,

and the interactions between them,
ie all the operations required in the relationing of the boids


*/

export class Vec2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Method to add another Vec2 to this vector
  add(vector: Vec2): Vec2 {
    return new Vec2(this.x + vector.x, this.y + vector.y);
  }
  subtract(vector: Vec2): Vec2 {
    return new Vec2(this.x - vector.x, this.y - vector.y);
  }
}

export class Boid {
  position: Vec2;
  velocity: Vec2;
  acceleration: Vec2;

  constructor(
    position = new Vec2(),
    velocity = new Vec2(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
    acceleration = new Vec2(
      Math.random() * 0.1 - 0.05,
      Math.random() * 0.1 - 0.05
    ) // Random acceleration between -0.05 and 0.05
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);

    // Calculate half of the canvas dimensions
    const halfWidth = canvasWidth / 2;
    const halfHeight = canvasHeight / 2;

    // Wrap around logic based on half canvas dimensions
    if (this.position.x > halfWidth) {
      this.position.x = -halfWidth; // Wrap to left
    } else if (this.position.x < -halfWidth) {
      this.position.x = halfWidth; // Wrap to right
    }

    if (this.position.y > halfHeight) {
      this.position.y = -halfHeight; // Wrap to top
    } else if (this.position.y < -halfHeight) {
      this.position.y = halfHeight; // Wrap to bottom
    }

    // Reset acceleration after each update
    this.acceleration = new Vec2();
  }

  steer(force: Vec2) {
    console.log('steer called !', this.velocity);

    this.velocity = force.subtract(this.velocity);
    console.log('AFTER STEER  !', this.velocity);
  }

  alignment(boidArray: Boid[]) {
    // console.log('ALIGNMENT CALLED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    let avg = new Vec2();
    for (let boid of boidArray) {
      avg = avg.add(boid.velocity);
    }
    avg.x = avg.x / boidArray.length;
    avg.y = avg.y / boidArray.length;

    return avg; // this returns the avg velocity of all the boids sent to it
  }

  show(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.fillStyle = 'beige';
    context.fill();
    context.closePath();
  }
}
