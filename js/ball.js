// ball object class
class Ball {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 10;
  }

  // draw ball on canvas
  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = this.col;
    ctx.fill()
  }

  // update position on the canvas
  updatePosition() {
    this.x += playerSpeed * rotX;
    this.y += playerSpeed * rotY;
  }

  // check collisions with canvas edges
  checkEdges() {
    if (this.x + this.radius > canvas.width) {
      this.x = canvas.width - this.radius;
    }

    if (this.x - this.radius < 0) {
      this.x = this.radius;
    }

    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
    }

    if (this.y - this.radius < 0) {
      this.y = this.radius;
    }
  }
}