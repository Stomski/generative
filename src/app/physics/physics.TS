export class Velocity {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Acceleration {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Thing {
  position: Position;
  acceleration: Acceleration;
  velocity: Velocity;
  mass: number;

  constructor(
    position: Position,
    acceleration: Acceleration,
    velocity: Velocity,
    mass: number
  ) {
    this.position = position;
    this.acceleration = acceleration;
    this.velocity = velocity;
    this.mass = mass;
  }
}
