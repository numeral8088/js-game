// ball object class
class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.color = color;
    this.radius = 10;
  }

  // draw ball on canvas
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill()
  }

  // update position on the canvas
  updatePosition() {
    this.ax = rotX * 0.01 + this.vx * -0.005;
    this.ay = rotY * 0.01 + this.vy * -0.005;
    this.checkEdges();
    this.vx += this.ax;
    this.vy += this.ay;
    this.x += this.vx;
    this.y += this.vy;
  }

  // check collisions with canvas edges
  checkEdges() {
    if (this.x + this.radius > canvas.width) {
      // this.x = canvas.width - this.radius;
      this.ax = this.vx * -2;
      this.ay = this.vy * -2;
    }

    if (this.x - this.radius < 0) {
      // this.x = this.radius;
      this.ax = this.vx * -2;
      this.ay = this.vy * -2;
    }

    if (this.y + this.radius > canvas.height) {
      // this.y = canvas.height - this.radius;
      this.ax = this.vx * -2;
      this.ay = this.vy * -2;
    }

    if (this.y - this.radius < 0) {
      // this.y = this.radius;
      this.ax = this.vx * -2;
      this.ay = this.vy * -2;
    }
  }
}
