class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
  }
}

class PlayerStart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
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
}

// level data
let levelData = [];

levelData[0] = null;

// level 1
levelData[1] = [
  new PlayerStart(20, 20),
  new Line(0, 240, 240, 240),
  new Line(240, 240, 240, 0),
  new Finish(440, 0, 40, 40)
];
