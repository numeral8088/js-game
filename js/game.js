// setup canvas, timer and level elements on page
// const canvas = document.getElementById("gameCanvas");
const levelText = document.querySelector(".level > span");
const timerText = document.querySelector(".timer > span");
// setup canvas rendering context
// const ctx = canvas.getContext("2d");

let rotX = 0;
let rotY = 0;
let dragX = 0;
let dragY = 0;
let dragMouseX = 0;
let dragMouseY = 0;
let isDragging = false;

let gameState = 0;

let startTime;
let currentTime;

// run game loop
// setInterval(game, 1 / 30);

let level = 1;
let levelLines = [];
let levelObjects = [];

function setup() {
  createCanvas(480, 480);
  parseLevel(levelData[level]);
}

function draw() {
  clear();
  // for (obj of levelData[level][0]) {
  //   if (gameState == 1) {
  //     obj.update();
  //   }
  //   obj.draw();
  // }
  for (obj of levelLines) {
    obj.draw();
  }
  for (obj of levelObjects) {
    obj.update();
    obj.draw();
  }
}

// game loop
function game() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (obj of levelData[level][0]) {
    if (gameState == 1) {
      obj.update();
    }
    obj.draw();
  }

  for (obj of levelData[level][1]) {
    obj.draw();
  }

  // update timer and level counter
  if (gameState == 1) {
    currentTime = new Date();
    timerText.textContent = formatTimer(Math.round((currentTime - startTime) / 1000));
    levelText.textContent = level;
  }
}

// mouse events for rotating the canvas
document.body.addEventListener("mousedown", e => {
  if (gameState == 0) {
    gameState = 1;
    startTime = new Date();
  }
  dragX = rotX;
  dragY = rotY;
  dragMouseX = convertCoordX(e.clientX) / (canvas.width / 2);
  dragMouseY = convertCoordY(e.clientY) / (canvas.height / 2);
  isDragging = true;
});

document.body.addEventListener("mouseup", e => {
  isDragging = false;
});

document.body.addEventListener("mousemove", e => {
  if (isDragging) {
    rotX = convertCoordX(e.clientX) / (canvas.width / 2) - dragMouseX + dragX;
    rotY = convertCoordY(e.clientY) / (canvas.height / 2) - dragMouseY + dragY;
    // set rotation limits
    if (rotX > 1) { rotX = 1; }
    if (rotX < -1) { rotX = -1; }
    if (rotY > 1) { rotY = 1; }
    if (rotY < -1) { rotY = -1; }
    // set css property so canvas can visually rotate on page
    document.body.style.setProperty('--rotate-x', rotX);
    document.body.style.setProperty('--rotate-y', rotY);
  }
});

// format timer as MM:SS
function formatTimer(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

// convert locations on canvas so 0,0 = center
function convertCoordX(x) {
  return x - canvas.width / 2;
}
function convertCoordY(y) {
  return y - canvas.height / 2;
}

// get distance from one location to another
function getDistance(x1, y1, x2, y2) {
  a = Math.abs(x1 - x2);
  b = Math.abs(y1 - y2);
  return Math.sqrt(a * a + b * b);
}

function parseLevel(data) {
  for (d of data) {
    switch (d[0]) {
      case 'player':
        levelObjects.push(new Player(d[1], d[2]));
        break;
      case 'enemy':
        levelObjects.push(new Enemy(d[1], d[2]));
        break;
      case 'hline':
        levelLines.push(new HLine(d[1], d[2], d[3]));
        break;
      case 'vline':
        levelLines.push(new VLine(d[1], d[2], d[3]));
        break;
      case 'finish':
        levelLines.push(new Finish(d[1], d[2], d[3], d[4]));
        break;
      
      default:
        console.log(d[0] + " object not found")
    }
  }
}
