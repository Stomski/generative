export class Vec2 {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vec2): void {
    this.x += vector.x;
    this.y += vector.y;
  }
  subtract(vector: Vec2): void {
    this.x -= vector.x;
    this.y -= vector.y;
  }
  multiply(factor: number): void {
    this.x *= factor;
    this.y *= factor;
  }
  divide(factor: number): void {
    this.x /= factor;
    this.y /= factor;
  }
}

export class Boid {
  position: Vec2;
  velocity: Vec2;
  accel: Vec2;

  constructor(
    accel = new Vec2(),
    position = new Vec2(),
    velocity = new Vec2(1, 1)
  ) {
    this.position = new Vec2(position.x, position.y);
    this.velocity = new Vec2(velocity.x, velocity.y);
    console.log("Acceleration received in constructor:", accel);
    this.accel = new Vec2(accel.x, accel.y);
    console.log("Acceleration after assignment:", this.accel, this);
    console.log("this at the end of the constructor of a BOID:", this);
    console.log("this at the end of the constructor of a BOID2222222:", this);
  }
}

const position = new Vec2(50, 50);

// Random velocity within specified range
const vel = new Vec2(
  Math.random() * 3 - 1.5, // Random between -1 and 1
  Math.random() * 3 - 1.5 // Random between -1 and 1
);

// Random accel within specified range
const accel = new Vec2(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05);

// Create new Boid with randomized position, velocity, and accel
let newBoid = new Boid(accel, position, vel);
console.log("newboid>>>>", newBoid);
console.log("accel>>>>??", accel);
