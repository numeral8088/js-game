// setup timer and level elements on page
const levelText = document.querySelector(".level > span");
const timerText = document.querySelector(".timer > span");

let rotation;
let dragX = 0;
let dragY = 0;
let dragMouseX = 0;
let dragMouseY = 0;
let isDragging = false;

let gameState = 0;

let startTime;
let currentTime;

let level = 1;
let levelLines = [];
let levelObjects = [];

function setup() {
  createCanvas(480, 480);
  rotation = createVector();
  loadLevel(levelData[level]);
}

function draw() {
  clear();

  let gravity = p5.Vector.mult(rotation, .5);

  // update and draw objects
  for (obj of levelObjects) {
    if (gameState == 1) {
      obj.applyForce(gravity);
      
      for (wall of levelLines) {
        let wallType = wall.constructor.name;
        switch (wallType) {
          case "VLine":
            obj.collideV(wall);
            break;
          case "HLine":
            obj.collideH(wall);
            break;
          case "Finish":
            break;
        }
      }

      obj.update();
    }
    obj.draw();
  }
  
  // draw level lines
  for (obj of levelLines) {
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
  dragX = rotation.x;
  dragY = rotation.y;
  dragMouseX = convertCoordX(e.clientX) / (canvas.width / 2);
  dragMouseY = convertCoordY(e.clientY) / (canvas.height / 2);
  isDragging = true;
});

document.body.addEventListener("mouseup", e => {
  isDragging = false;
});

document.body.addEventListener("mousemove", e => {
  if (isDragging) {
    rotation.x = convertCoordX(e.clientX) / (canvas.width / 2) - dragMouseX + dragX;
    rotation.y = convertCoordY(e.clientY) / (canvas.height / 2) - dragMouseY + dragY;
    rotation.limit(1);
    rotateCanvas();
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

function loadLevel(data) {
  // reset game variables
  levelObjects = [];
  levelLines = [];
  gameState = 0;
  levelText.textContent = level;
  timerText.textContent = "00:00";
  rotation.x = 0;
  rotation.y = 0;
  rotateCanvas();
  let prevX = 0;
  let prevY = 0;

  // parse level data and create game objects
  for (d of data) {
    switch (d[0]) {
      case 'player': // player object
        levelObjects.push(new Player(d[1], d[2]));
        break;
      case 'enemy': // enemy object
        levelObjects.push(new Enemy(d[1], d[2]));
        break;
      case 'hline': // horizontal line
        levelLines.push(new HLine(d[1], d[2], d[3]));
        prevX = d[3];
        prevY = d[2];
        break;
      case 'rhline': // relative horizontal line
        levelLines.push(new HLine(prevX, prevY, d[1]));
        prevX = d[1];
        break;
      case 'vline': // vertical line
        levelLines.push(new VLine(d[1], d[2], d[3]));
        prevX = d[1];
        prevY = d[3];
        break;
      case 'rvline': // relative vertical line
        levelLines.push(new VLine(prevX, prevY, d[1]));
        prevY = d[1];
        break;
      case 'finish': // goal area
        // use unshift instead of push so finish area is drawn first
        levelLines.unshift(new Finish(d[1], d[2], d[3], d[4]));
        break;
      default:
        console.log(d[0] + " object not found")
    }
  }
}

// set css property so canvas can visually rotate on page
function rotateCanvas() {
  document.body.style.setProperty('--rotate-x', rotation.x);
  document.body.style.setProperty('--rotate-y', rotation.y);
}
