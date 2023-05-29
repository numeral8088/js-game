class HLine {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw() {
    ctx.lineWidth = 6;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y);
    ctx.stroke();
  }

  update() {
    return
  }
}

class VLine {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
  }

  draw() {
    ctx.lineWidth = 6;
    ctx.lineCap = "square";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.stroke();
  }

  update() {
    return
  }
}

class Finish {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x1, this.y1, this.x2, this.y2);
  }

  update() {
    return;
  }
}

// level data
let levelData = [];

// level 1
levelData[1] = [
  new Player(20, 20),
  new Enemy(400, 400),
  new HLine(0, 240, 240),
  new VLine(240, 0, 240),
  new Finish(440, 0, 40, 40),
];
