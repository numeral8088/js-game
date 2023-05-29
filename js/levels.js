class HLine {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.r = 3;
  }

  draw() {
    strokeWeight(this.r * 2);
    strokeCap(PROJECT);
    line(this.x, this.y, this.w, this.y);
  }
}

class VLine {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.r = 3;
  }

  draw() {
    strokeWeight(this.r * 2);
    strokeCap(PROJECT);
    line(this.x, this.y, this.x, this.h);
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

// debug level
levelData[0] = [
  // set player spawn
  ["player", 270, 90],
  // set an enemy spawn
  ["enemy", 400, 400],
  // draw a horizontal line
  ["hline", 60, 240, 240],
  // draw a vertical line
  ["vline", 240, 240, 60],
  // draw a horizontal line starting at previous coordinates
  ["rhline", 300],
  // draw a vertical line starting at previous coordinates
  ["rvline", 240],
  // level goal area
  ["finish", 440, 0, 40, 40],
]

// level 1
levelData[1] = [
  ["hline", 0, 420, 420],
  ["vline", 420, 420, 60],
  ["rhline", 60],
  ["rvline", 120],
  ["rhline", 360],
  ["hline", 0, 180, 360],
  ["rvline", 360],
  ["vline", 300, 420, 240],
  ["rhline", 60],
  ["rvline", 360],
  ["rhline", 240],
  ["rvline", 300],
  ["rhline", 120],
  ["player", 30, 450],
  ["enemy", 90, 90],
  ["finish", 180, 300, 60, 60],
]
