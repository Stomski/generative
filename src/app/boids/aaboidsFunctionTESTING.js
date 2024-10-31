"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boid = exports.Vec2 = void 0;
var Vec2 = /** @class */ (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.add = function (vector) {
        this.x += vector.x;
        this.y += vector.y;
    };
    Vec2.prototype.subtract = function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    };
    Vec2.prototype.multiply = function (factor) {
        this.x *= factor;
        this.y *= factor;
    };
    Vec2.prototype.divide = function (factor) {
        this.x /= factor;
        this.y /= factor;
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
var Boid = /** @class */ (function () {
    function Boid(accel, position, velocity) {
        if (accel === void 0) { accel = new Vec2(); }
        if (position === void 0) { position = new Vec2(); }
        if (velocity === void 0) { velocity = new Vec2(1, 1); }
        this.position = new Vec2(position.x, position.y);
        this.velocity = new Vec2(velocity.x, velocity.y);
        console.log('Acceleration received in constructor:', accel);
        this.accel = new Vec2(accel.x, accel.y);
        console.log('Acceleration after assignment:', this.accel, this);
        console.log('this at the end of the constructor of a BOID:', this);
        console.log('this at the end of the constructor of a BOID2222222:', this);
    }
    return Boid;
}());
exports.Boid = Boid;
var position = new Vec2(50, 50);
// Random velocity within specified range
var vel = new Vec2(Math.random() * 3 - 1.5, // Random between -1 and 1
Math.random() * 3 - 1.5 // Random between -1 and 1
);
// Random accel within specified range
var accel = new Vec2(Math.random() * 0.1 - 0.05, Math.random() * 0.1 - 0.05);
// Create new Boid with randomized position, velocity, and accel
var newBoid = new Boid(accel, position, vel);
console.log('newboid>>>>', newBoid);
console.log('accel>>>>??', accel);
