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
}

export class Boid {
  position: Vec2;
  velocity: Vec2;
  acceleration: Vec2;

  constructor(
    position = new Vec2(),
    velocity = new Vec2(),
    acceleration = new Vec2()
  ) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  // Example method to update boid's position based on velocity and acceleration
  update(): void {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
    // Reset acceleration after each update
    this.acceleration = new Vec2();
  }
}
