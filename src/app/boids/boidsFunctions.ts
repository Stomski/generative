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
  steerVec(vector: Vec2): Vec2 {
    return new Vec2(vector.x - this.x, vector.y - this.y);
  }
}

export class Boid {
  position: Vec2;
  velocity: Vec2;
  accel: Vec2;

  constructor(accel: Vec2, position = new Vec2(), velocity = new Vec2(1, 1)) {
    this.position = new Vec2(position.x, position.y);
    this.velocity = new Vec2(velocity.x, velocity.y);
    // console.log('\n Acceleration received in constructor:', accel);
    this.accel = new Vec2(accel.x, accel.y);
    // console.log(
    //   '\nthis.Acceleration after assignment:',
    //   this.accel,
    //   '\nthis>>>',
    //   this
    // );
    // console.log('\n', this.accel, '<<<this.accel what the fucl');
    // console.log('\nthis at the end of the constructor of a BOID:', this);
    // console.log('this at the end of the constructor of a BOID2222222:', this);
  }

  // Method to generate a new flock with randomized position, velocity, and accel
  static newFlock(size: number, canvasDimensions: number[]): Boid[] {
    let flockArray: Boid[] = [];
    const [width, height] = canvasDimensions;

    for (let i = 0; i < size; i++) {
      // Random position within canvas bounds
      const position = new Vec2(
        Math.random() * width - width / 2,
        Math.random() * height - height / 2
      );

      // Random velocity within specified range
      const vel = new Vec2(
        Math.random() * 5 - 1.5, // Random between -1 and 1
        Math.random() * 3 - 1.5 // Random between -1 and 1
      );

      // Random accel within specified range
      const accel = new Vec2(
        Math.random() * 0.3 - 0.05,
        Math.random() * 0.1 - 0.05
      );

      // Create new Boid with randomized position, velocity, and accel
      let newBoid = new Boid(accel, position, vel);
      // console.log('newboid>>>>', newBoid);
      // console.log('accel>>>>??', accel);
      flockArray.push(newBoid);
    }
    // console.log(flockArray, 'FLOCK ARRAY');
    return flockArray;
  }

  // Method to calculate the distance to another Boid
  distanceTo(
    otherBoid: Boid,
    canvasWidth: number,
    canvasHeight: number
  ): number {
    const dx = this.position.x - otherBoid.position.x;
    const dy = this.position.y - otherBoid.position.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  update(canvasWidth: number, canvasHeight: number): void {
    this.velocity.add(this.accel);

    if (this.velocity.x > 5) {
      this.velocity.x = 5;
    } else if (this.velocity.x < -5) {
      this.velocity.x = -5;
    }
    if (this.velocity.y > 5) {
      this.velocity.y = 5;
    } else if (this.velocity.y < -5) {
      this.velocity.y = -5;
    }

    // if (this.velocity.x < 0.5 && this.velocity.x > 0) {
    //   this.velocity.x = 0.5;
    // } else if (this.velocity.x > -0.5 && this.velocity.x < 0) {
    //   this.velocity.x = -0.5;
    // }

    // if (this.velocity.y < 0.5 && this.velocity.y > 0) {
    //   this.velocity.y = 0.5;
    // } else if (this.velocity.y > -0.5 && this.velocity.y < 0) {
    //   this.velocity.y = -0.5;
    // }

    this.position.add(this.velocity);

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

    // Reset accel after each update
    // this.accel = new Vec2();
  }

  steer(alignmentForce: Vec2, cohesionForce: Vec2): Vec2 {
    this.accel.add(alignmentForce);
    cohesionForce.multiply(2);
    this.accel.add(cohesionForce);
    this.accel.divide(2);
    this.accel.multiply(0.01);
    return this.accel;
  }

  alignment(boidArray: Boid[]): Vec2 {
    let avg = new Vec2();
    for (let boid of boidArray) {
      if (boid !== this) {
        avg.add(boid.velocity);
      }
    }
    avg.divide(boidArray.length);
    // console.log('AVG>>>>', avg);
    return avg; // this returns the avg velocity of all the boids sent to it
  }

  cohesion(boidArray: Boid[], canvasWidth: number, canvasHeight: number): Vec2 {
    let neighborPositionArray: Vec2[] = [];
    let total = 1;
    for (let boid of boidArray) {
      if (this.distanceTo(boid, canvasWidth, canvasHeight) < 20) {
        // console.log(boid);
        neighborPositionArray.push(boid.position);
        total++;
      }
    }
    if (total === 0) return new Vec2(); // No neighbors within range, return zero vector
    let averagePosition = new Vec2(0, 0);
    for (let pos of neighborPositionArray) {
      averagePosition.add(pos); // Add each neighbor's position to the total
    }
    averagePosition.divide(neighborPositionArray.length); // Divide by the number of neighbors to get the average position

    let awayFromAverage = new Vec2(this.position.x, this.position.y);
    awayFromAverage.subtract(averagePosition); // Point away from the average position

    return awayFromAverage;
  }

  seperation(
    boidArray: Boid[],
    canvasWidth: number,
    canvasHeight: number
  ): Vec2 {
    return new Vec2();
  }

  show(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
    context.fillStyle = 'beige';
    context.fill();
    context.closePath();
  }
}
