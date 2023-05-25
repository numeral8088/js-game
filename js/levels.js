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

function drawLevel(level) {
  for (obj of level) {
    obj.draw();
  }
}

// level data
let levelData = [];

// level 1
levelData[0] = [
  new Line(0, 240, 240, 240),
  new Line(240, 240, 240, 0),
];
