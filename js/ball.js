// ball object class
class Ball {
  constructor(x, y, color) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.color = color;
    this.radius = 10;
    this.mass = sqrt(this.radius);
    this.velLoss = -.5;
    this.frictionLoss = 0.02;
  }

  // draw ball on canvas
  draw() {
    fill(this.color);
    strokeWeight(0);
    // circle(this.pos.x, this.pos.y, this.radius * 2);
    square(this.pos.x - this.radius, this.pos.y - this.radius, this.radius * 2);
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0, 0);
    this.edges();
    this.friction();
  }

  friction() {
    let friction = this.vel.copy();
    friction.normalize();
    friction.mult(-1);
    friction.setMag(0.03 * this.mass);
    this.applyForce(friction);
  }

  collideHPlane(y, d) {
    // d = direction, if d=1: a ball travelling down will go through the line
    let distance;
    let direction = degrees(this.vel.heading()) < 0;
    if (d == direction) {
      if (this.pos.y > y) {
        distance = (this.pos.y - this.radius) - y;
        if (distance <= 0 || this.pos.y - this.vel.y <= y) {
          this.pos.y = y + this.radius;
          this.vel.y *= this.velLoss;
          this.vel.x *= 1 - this.frictionLoss;
        }
      } else {
        distance = y - (this.pos.y + this.radius);
        if (distance <= 0 || this.pos.y + this.vel.y >= y) {
          this.pos.y = y - this.radius;
          this.vel.y *= this.velLoss;
          this.vel.x *= 1 - this.frictionLoss;
        }
      }
    }
  }

  collideVPlane(x, d) {
    // d = direction, if d=1: a ball travelling right will go through the line
    let distance;
    let direction = abs(degrees(this.vel.heading())) > 90;
    if (d == direction) {
      if (this.pos.x > x) {
        distance = (this.pos.x - this.radius) - x;
        if (distance <= 0 || this.pos.x - this.vel.x <= x) {
          this.pos.x = x + this.radius;
          this.vel.x *= this.velLoss;
          this.vel.y *= 1 - this.frictionLoss;
        }
      } else {
        distance = x - (this.pos.x + this.radius);
        if (distance <= 0 || this.pos.x + this.vel.x >= x) {
          this.pos.x = x - this.radius;
          this.vel.x *= this.velLoss;
          this.vel.y *= 1 - this.frictionLoss;
        }
      }
    }
  }

  collideH(l) {
    let x = min(l.x, l.w) - l.r;
    let y = l.y - l.r;
    let x2 = max(l.x, l.w) + l.r;
    let y2 = l.y + l.r;

    let ballLeft = this.pos.x - this.radius;
    let ballRight = this.pos.x + this.radius;
    let ballTop = this.pos.y - this.radius;
    let ballBottom = this.pos.y + this.radius;

    if (ballRight - 1 > x && ballLeft + 1 < x2) {
      this.collideHPlane(y, 0);
      this.collideHPlane(y2, 1);
    }

    if (ballBottom - 1 > y && ballTop + 1 < y2) {
      this.collideVPlane(x, 0);
      this.collideVPlane(x2, 1);
    }
  }

  collideV(l) {
    let x = l.x - l.r;
    let y = min(l.y, l.h) - l.r;
    let x2 = l.x + l.r;
    let y2 = max(l.y, l.h) + l.r;
    
    let ballLeft = this.pos.x - this.radius;
    let ballRight = this.pos.x + this.radius;
    let ballTop = this.pos.y - this.radius;
    let ballBottom = this.pos.y + this.radius;
    
    if (ballRight - 1 > x && ballLeft + 1 < x2) {
      this.collideHPlane(y, 0);
      this.collideHPlane(y2, 1);
    }

    if (ballBottom - 1 > y && ballTop + 1 < y2) {
      this.collideVPlane(x, 0);
      this.collideVPlane(x2, 1);
    }
  }

  collideF(l) {
    let xCondition = this.pos.x > l.x && this.pos.x < l.x + l.w;
    let yCondition = this.pos.y > l.y && this.pos.y < l.y + l.h;
    if (xCondition && yCondition) {
      if (this.constructor.name == "Player") {
        levelFinish();
      }
    }
  }

  edges() {
    this.collideHPlane(0, 1);
    this.collideHPlane(height, 0);
    this.collideVPlane(0, 1);
    this.collideVPlane(width, 0);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
}

class Player extends Ball {
  constructor(x, y) {
    super(x, y, '#f00');
  }
}

class Enemy extends Ball {
  constructor(x, y) {
    super(x, y, "#00f");
  }
}
