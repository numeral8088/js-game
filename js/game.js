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

let level = 0;
let levelLines = [];
let levelObjects = [];

function setup() {
  createCanvas(480, 480);
  rotation = createVector();
  loadLevel(levelData[level]);
}

let gravity;

function draw() {
  clear();

    // draw level lines
    for (obj of levelLines) {
      obj.draw();
    }

  gravity = p5.Vector.mult(rotation, .5);

  // update and draw objects
  for (obj of levelObjects) {
    if (gameState == 1) {
      obj.applyForce(gravity);
      
      for (l of levelLines) {
        let type = l.constructor.name;
        switch (type) {
          case "VLine":
            obj.collideV(l);
            break;
          case "HLine":
            obj.collideH(l);
            break;
          case "HDoor":
            if (!l.open) obj.collideH(l);
            break;
          case "Plate":
            obj.collideP(l);
            break;
          case "Finish":
            obj.collideF(l);
            break;
        }
      }

      obj.update();
    }
    obj.draw();
  }

  // update timer and level counter
  if (gameState == 1) {
    currentTime = new Date();
    timerText.textContent = formatTimer(Math.round((currentTime - startTime) / 1000));
    levelText.textContent = level;
  }
}

// mouse movement handler functions
const mouseDownHandler = (e) => {
  if (gameState == 0) {
    gameState = 1;
    startTime = new Date();
  }
  dragX = rotation.x;
  dragY = rotation.y;
  dragMouseX = convertCoordX(e.clientX) / (canvas.width / 2);
  dragMouseY = convertCoordY(e.clientY) / (canvas.height / 2);
  isDragging = true;
}

const mouseUpHandler = (e) => {
  isDragging = false;
}

const mouseMoveHandler = (e) => {
  if (isDragging) {
    rotation.x = convertCoordX(e.clientX) / (canvas.width / 2) - dragMouseX + dragX;
    rotation.y = convertCoordY(e.clientY) / (canvas.height / 2) - dragMouseY + dragY;
    rotation.limit(1);
    rotateCanvas();
  }
}

// mouse events for rotating the canvas
function setupMouseListeners() {
  document.body.setAttribute('drag', "");
  document.body.addEventListener("mousedown", mouseDownHandler);
  document.body.addEventListener("mouseup", mouseUpHandler);
  document.body.addEventListener("mousemove", mouseMoveHandler);
}

function removeMouseListeners() {
  document.body.removeAttribute('drag');
  isDragging = false;
  document.body.removeEventListener("mousedown", mouseDownHandler);
  document.body.removeEventListener("mouseup", mouseUpHandler);
  document.body.removeEventListener("mousemove", mouseMoveHandler);
}

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
  rotation.set(0, 0);
  rotateCanvas();
  setupMouseListeners();
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
      case 'hdoor': // vertical line
        levelLines.unshift(new HDoor(d[1], d[2], d[3], d[4]));
        prevX = d[1];
        prevY = d[3];
        break;
      case 'plate': // pressure plate
        // use unshift instead of push so finish area is drawn first
        levelLines.unshift(new Plate(d[1], d[2], d[3], d[4], d[5]));
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

const dialog = document.getElementById('levelCompleteDialog');
const nextLevelButton = document.getElementById('nextLevelButton');
const dialogLevelText = document.querySelector('dialog>h1>span');
const dialogTimerText = document.querySelector('dialog>p>span');

function levelFinish() {
  removeMouseListeners();
  gameState = 0;
  dialogLevelText.textContent = level;
  dialogTimerText.textContent = formatTimer(Math.round((currentTime - startTime) / 1000));
  dialog.showModal();
}

nextLevelButton.addEventListener('click', (e) => {
  level += 1;
  loadLevel(levelData[level]);
  dialog.close();
})

function gotoLevel(l) {
  level = l;
  loadLevel(levelData[level]);
}
