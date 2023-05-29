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
  }

  // draw ball on canvas
  draw() {
    fill(this.color);
    strokeWeight(0);
    circle(this.pos.x, this.pos.y, 20);
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

  collideV(wall) {
    let normal = this.pos.y - this.radius < wall.h && this.pos.y + this.radius > wall.y;
    let reverse = this.pos.y - this.radius > wall.h && this.pos.y + this.radius < wall.y;
    if (normal || reverse) {
      let wallLeft = wall.x - wall.r;
      let wallRight = wall.x + wall.r;
      let ballLeft = this.pos.x - this.radius;
      let ballRight = this.pos.x + this.radius;

      let distanceToLeft = wallLeft - ballRight;
      let distanceToRight = ballLeft - wallRight;

      if (this.pos.x < wall.x) {
        if (distanceToLeft <= 0 || this.pos.x + this.vel.x >= wall.x) {
          this.pos.x = wallLeft - this.radius;
          this.vel.x *= this.velLoss;
        }
      } else {
        if (distanceToRight <= 0 || this.pos.x - this.vel.x <= wall.x) {
          this.pos.x = wallRight + this.radius;
          this.vel.x *= this.velLoss;
        }
      }
    }
  }

  collideH(wall) {
    let normal = this.pos.x - this.radius < wall.w && this.pos.x + this.radius > wall.x;
    let reverse = this.pos.x - this.radius > wall.w && this.pos.x + this.radius < wall.x;
    if (normal || reverse) {
      let wallTop = wall.y - wall.r;
      let wallBottom = wall.y + wall.r;
      let ballTop = this.pos.y - this.radius;
      let ballBottom = this.pos.y + this.radius;

      let distanceToTop = wallTop - ballBottom;
      let distanceToBottom = ballTop - wallBottom;

      if (this.pos.y < wall.y) {
        if (distanceToTop <= 0 || this.pos.y + this.vel.y >= wall.y) {
          this.pos.y = wallTop - this.radius;
          this.vel.y *= this.velLoss;
        }
      } else {
        if (distanceToBottom <= 0 || this.pos.y - this.vel.y <= wall.y) {
          this.pos.y = wallBottom + this.radius;
          this.vel.y *= this.velLoss;
        }
      }
    }
  }

  edges() {
    if (this.pos.y >= height - this.radius) {
      this.pos.y = height - this.radius;
      this.vel.y *= this.velLoss;
    } else if (this.pos.y <= this.radius) {
      this.pos.y = this.radius;
      this.vel.y *= this.velLoss;
    }
    if (this.pos.x >= width - this.radius) {
      this.pos.x = width - this.radius;
      this.vel.x *= this.velLoss;
    } else if (this.pos.x <= this.radius) {
      this.pos.x = this.radius;
      this.vel.x *= this.velLoss;
    }
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
