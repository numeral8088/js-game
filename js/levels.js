class HLine {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.r = 3;
    this.color = 0;
  }

  draw() {
    strokeWeight(this.r * 2);
    strokeCap(PROJECT);
    stroke(this.color);
    line(this.x, this.y, this.w, this.y);
  }
}

class VLine {
  constructor(x, y, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.r = 3;
    this.color = 0;
  }

  draw() {
    strokeWeight(this.r * 2);
    strokeCap(PROJECT);
    stroke(this.color);
    line(this.x, this.y, this.x, this.h);
  }
}

class Finish {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = "red";
  }

  draw() {
    fill(this.color);
    strokeWeight(0);
    rect(this.x, this.y, this.w, this.h);
  }
}

class HDoor extends HLine {
  constructor(x, y, w, id) {
    super(x, y, w);
    this.id = id;
    this.r = 2;
    this.open = false;
  }

  draw() {
    if (this.open) {
      this.color = 200;
    } else {
      this.color = 128;
    }
    super.draw();
  }
}

class Plate extends Finish {
  constructor(x, y, w, h, id) {
    super(x, y, w, h);
    this.id = id;
    this.color = 200;
    this.pressed = false;
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
  // // draw a horizontal line from previous coordinates
  ["rhline", 300],
  // // draw a vertical line from previous coordinates
  ["rvline", 240],
  // // level goal area
  ["finish", 440, 0, 40, 40],
  // // pressure plate used for actions such as doors when ball touches
  ["plate", 0, 440, 40, 40, 0],
  // // vertical door line opens with pressure plate with same id
  ["hdoor", 240, 240, 300, 0],
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

// level 2  
levelData[2] = [
  ["player", 240, 240],
]
