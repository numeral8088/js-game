class HLine {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.r = 3;
    this.color = colors.line;
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
    this.color = colors.line;
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
    this.color = colors.finish;
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
      this.color = colors.openDoor;
    } else {
      this.color = colors.closedDoor;
    }
    super.draw();
  }
}

class VDoor extends VLine {
  constructor(x, y, h, id) {
    super(x, y, h);
    this.id = id;
    this.r = 2;
    this.open = false;
  }

  draw() {
    if (this.open) {
      this.color = colors.openDoor;
    } else {
      this.color = colors.closedDoor;
    }
    super.draw();
  }
}

class Plate extends Finish {
  constructor(x, y, w, h, id) {
    super(x, y, w, h);
    this.id = id;
    this.color = colors.plate;
    this.pressed = false;
    this.objects = 0;
  }

  collideWithObject(obj) {
    let x = obj.pos.x > this.x && obj.pos.x < this.x + this.w;
    let y = obj.pos.y > this.y && obj.pos.y < this.y + this.h;
    if (x && y) {
      return true
    }
  }
}

// level data
let levelData = [];

// debug level
levelData[0] = [
  // set player spawn
  ['player', 270, 90],
  // set an enemy spawn
  ['enemy', 400, 400],
  // draw a horizontal line from x,y to x2,y
  ['hline', 60, 240, 240],
  // draw a vertical line from x,y to x,y2
  ['vline', 240, 240, 60],
  // draw a horizontal line to x starting from previous coordinates
  ['rhline', 300],
  // draw a vertical line to y starting from previous coordinates
  ['rvline', 240],
  // level goal area
  ['finish', 440, 0, 40, 40],
  // pressure plate used for actions such as doors when a ball rolls over
  ['plate', 0, 440, 40, 40, 0],
  ['plate', 0, 0, 40, 40, 1],
  // horizontal door line that opens with pressure plate with same id
  ['hdoor', 240, 240, 300, 0],
  // vertical door line that opens with pressure plate with same id
  ['vdoor', 60, 240, 300, 1],
];

// level 1
levelData[1] = [
  ['hline', 0, 420, 420],
  ['vline', 420, 420, 60],
  ['rhline', 60],
  ['rvline', 120],
  ['rhline', 360],
  ['hline', 0, 180, 360],
  ['rvline', 360],
  ['vline', 300, 420, 240],
  ['rhline', 60],
  ['rvline', 360],
  ['rhline', 240],
  ['rvline', 300],
  ['rhline', 120],
  ['player', 30, 450],
  ['enemy', 90, 90],
  ['finish', 180, 300, 60, 60],
];

// level 2  
levelData[2] = [
  ['player', 210, 330],
  ['enemy', 90, 90],
  ['vline', 240, 300, 360],
  ['rhline', 60],
  ['rvline', 420],
  ['rhline', 300],
  ['rvline', 240],
  ['rhline', 0],
  ['hline', 0, 300, 180],
  ['hline', 420, 420, 360],
  ['rvline', 180],
  ['rhline', 0],
  ['vline', 420, 360, 120],
  ['rhline', 60],
  ['rvline', 60],
  ['rhline', 480],
  ['finish', 420, 0, 60, 60],
];

// level 3
levelData[3] = [
  ['vline', 420, 0, 180],
  ['vline', 360, 60, 240],
  ['vline', 300, 0, 180],
  ['vline', 240, 60, 240],
  ['vline', 180, 0, 180],
  ['vline', 120, 60, 240],
  ['vline', 60, 0, 180],
  ['hline', 0, 240, 480],
  ['vline', 420, 300, 480],
  ['vline', 360, 240, 420],
  ['vline', 300, 300, 480],
  ['vline', 240, 240, 420],
  ['vline', 180, 300, 480],
  ['vline', 120, 240, 420],
  ['vline', 60, 300, 480],
  ['plate', 0, 420, 60, 60, 0],
  ['vdoor', 60, 180, 240, 0],
  ['finish', 0, 0, 60, 60],
  ['player', 450, 30],
  ['enemy', 450, 450],
]

// level 4
levelData[4] = [
  ['player', 30, 30],
  ['enemy', 90, 90],
  ['hline', 0, 60, 420],
  ['rvline', 420],
  ['vline', 360, 480, 60],
  ['vline', 120, 60, 120],
  ['rhline', 60],
  ['hdoor', 0, 120, 60, 0],
  ['plate', 360, 120, 60, 60, 0],
  ['vline', 300, 60, 180],
  ['rhline', 180],
  ['hline', 180, 120, 300],
  ['vline', 240, 180, 240],
  ['rhline', 300],
  ['rvline', 300],
  ['vline', 300, 360, 480],
  ['vline', 240, 420, 480],
  ['vline', 180, 480, 420],
  ['rhline', 120],
  ['rvline', 360],
  ['hline', 0, 420, 60],
  ['vline', 60, 300, 360],
  ['rhline', 240],
  ['rvline', 300],
  ['hline', 0, 240, 120],
  ['rvline', 300],
  ['hline', 120, 180, 60],
  ['rvline', 240],
  ['vline', 180, 240, 360],
  ['hdoor', 360, 120, 420, 1],
  ['plate', 120, 360, 60, 60, 1],
  ['finish', 360, 60, 60, 60]
];

// level 5
levelData[5] = [
  ['player', 15, 15],
  ['enemy', 465, 15],
  ['hline', 0, 30, 210],
  ['rvline', 60],
  ['rhline', 30],
  ['hline', 480, 30, 270],
  ['rvline', 60],
  ['rhline', 450],
  ['vline', 240, 30, 90],
  ['rhline', 210],
  ['rvline', 150],
  ['hline', 240, 150, 90],
  ['rvline', 120],
  ['rhline', 30],
  ['rvline', 90],
  ['vline', 180, 60, 120],
  ['vline', 150, 90, 150],
  ['vline', 120, 60, 120],
  ['hline', 120, 90, 60],
  ['vline', 270, 90, 210],
  ['rhline', 210],
  ['rvline', 180],
  ['rhline', 120],
  ['rvline', 150],
  ['hline', 240, 120, 270],
  ['hline', 240, 180, 270],
  ['vline', 300, 90, 240],
  ['rhline', 260],
  ['hdoor', 260, 240, 220, 0],
  ['rhline', 180],
  ['rvline', 210],
  ['rhline', 90],
  ['vline', 90, 180, 330],
  ['rhline', 120],
  ['rvline', 390],
  ['rhline', 150],
  ['vline', 120, 210, 300],
  ['vline', 150, 240, 480],
  ['hline', 150, 300, 180],
  ['vline', 210, 240, 330],
  ['hline', 210, 300, 270],
  ['rvline', 240],
  ['vline', 240, 300, 360],
  ['vline', 180, 330, 360],
  ['rhline', 270],
  ['rvline', 390],
  ['hline', 150, 420, 180],
  ['rvline', 450],
  ['rhline', 210],
  ['hline', 180, 390, 240],
  ['rvline', 450],
  ['vline', 210, 390, 420],
  ['vline', 270, 480, 450],
  ['rhline', 360],
  ['vline', 330, 390, 450],
  ['hline', 240, 420, 300],
  ['rvline', 300],
  ['rhline', 360],
  ['vline', 330, 300, 270],
  ['rhline', 300],
  ['hline', 300, 330, 270],
  ['hline', 210, 270, 180],
  ['hline', 300, 360, 390],
  ['vline', 360, 360, 420],
  ['rhline', 390],
  ['rvline', 480],
  ['hline', 330, 330, 420],
  ['hline', 390, 390, 450],
  ['rvline', 420],
  ['rhline', 420],
  ['rvline', 450],
  ['hline', 450, 450, 480],
  ['vline', 420, 390, 120],
  ['vline', 450, 360, 90],
  ['rhline', 390],
  ['rvline', 180],
  ['hline', 390, 120, 330],
  ['rvline', 60],
  ['vline', 360, 60, 90],
  ['vline', 390, 330, 270],
  ['rhline', 360],
  ['rvline', 240],
  ['hline', 330, 240, 390],
  ['hline', 420, 210, 360],
  ['rvline', 150],
  ['rhline', 300],
  ['hline', 330, 180, 360],
  ['hline', 300, 210, 330],
  ['vline', 30, 450, 420],
  ['rhline', 60],
  ['rvline', 390],
  ['rhline', 30],
  ['rvline', 360],
  ['rhline', 0],
  ['vline', 120, 420, 450],
  ['rhline', 60],
  ['vline', 90, 450, 360],
  ['rhline', 60],
  ['rvline', 210],
  ['hline', 60, 330, 30],
  ['rvline', 180],
  ['rhline', 60],
  ['rvline', 120],
  ['hline', 0, 150, 30],
  ['plate', 240, 300, 30, 30, 0],
  ['finish', 220, 250, 40, 40],
];
