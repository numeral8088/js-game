class HLine {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  draw() {
    strokeWeight(6);
    strokeCap(PROJECT);
    line(this.x, this.y, this.x + this.w, this.y);
  }
}

class VLine {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
  }

  draw() {
    strokeWeight(6);
    strokeCap(PROJECT);
    line(this.x, this.y, this.x, this.y + this.h);
  }
}

class Finish {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    drawingContext.fillStyle = "red";
    drawingContext.fillRect(this.x, this.y, this.w, this.h);
  }
}

// level data
let levelData = [];

// level 1
levelData[1] = [
  ["player", 20, 20],
  ["enemy", 400, 400],
  ["hline", 0, 240, 240],
  ["vline", 240, 0, 240],
  ["finish", 440, 0, 40, 40],
]
