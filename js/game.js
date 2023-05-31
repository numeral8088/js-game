// setup timer and level elements on page
const levelText = document.querySelector(".level > span");
const timerText = document.querySelector(".timer > span");
// element used to capture mouse input and rotate the canvas
const mouseCapture = document.getElementById('captureMouseDrag');
// elements used for the level warp feature
const debugOptions = document.getElementById('debugOptions');
const debugWarpCounter = document.getElementById('debugWarpCounter');
const debugWarpButton = document.getElementById('debugWarpButton');
// elements used for the level complete dialog
const dialog = document.getElementById('levelCompleteDialog');
const nextLevelButton = document.getElementById('nextLevelButton');
const dialogLevelText = document.querySelector('dialog>h1>span');
const dialogTimerText = document.querySelector('dialog>p>span');

let rotation;
let dragX = 0;
let dragY = 0;
let dragMouseX = 0;
let dragMouseY = 0;
let isDragging = false;
let showDebug = false;

let gameState = 0;

let startTime;
let currentTime;

const colors = {
  'bg': 'hsl(0, 0%, 0%)',
  'bg2': 'hsl(220, 50%, 10%)',
  "line": 'hsl(220, 80%, 50%)',
  'border': 'hsl(220, 80%, 50%)',
  "closedDoor": 'hsl(350, 80%, 50%)',
  "openDoor": 'hsla(350, 80%, 50%, 0.5)',
  "plate": 'hsla(147, 100%, 35%, 0.5)',
  "platePressed": 'hsl(147, 100%, 35%)',
  'finish': 'hsla(350, 80%, 60%, 0.75)',
  'player': 'hsl(350, 80%, 60%)',
  'enemy': 'hsl(250, 80%, 70%)',
}

document.body.style.setProperty('--canvas-bg', colors.bg);
document.body.style.setProperty('--canvas-bg2', colors.bg2);
document.body.style.setProperty('--canvas-border', colors.border);

let level = 1;
let levelLines = [];
let levelDoors = [];
let levelObjects = [];

function setup() {
  createCanvas(480, 480);
  rotation = createVector();
  loadLevel(levelData[level]);
}

let gravity;

function draw() {
  clear();

  // open level doors if needed
  checkDoors();

  // draw level doors
  for (obj of levelDoors) {
    obj.draw();
  }

  // draw level lines
  for (obj of levelLines) {
    obj.draw();
  }

  gravity = p5.Vector.mult(rotation, .5);
  something = 0;
  // update and draw objects
  for (obj of levelObjects) {
    if (gameState == 1) {
      obj.applyForce(gravity);
      // run collision checks on all level lines
      runCollisionChecks();
      obj.update();
    }
    // draw objects
    obj.draw();
  }

  // update timer and level counter
  if (gameState == 1) {
    currentTime = new Date();
    timerText.textContent = formatTimer(Math.round((currentTime - startTime) / 1000));
    levelText.textContent = level;
  }

}

function runCollisionChecks() {
  for (l of levelLines) {
    let type = l.constructor.name;
    switch (type) {
      case "VLine":
        obj.collideV(l);
        break;
      case "HLine":
        obj.collideH(l);
        break;
      case "Plate":
        if (l.collideWithObject(obj)) l.objects++;
        break;
      case "Finish":
        obj.collideF(l);
        break;
    }
  }

  for (d of levelDoors) {
    let type = d.constructor.name;
    switch (type) {
      case "HDoor":
        if (!d.open) obj.collideH(d);
        break;
      case "VDoor":
        if (!d.open) obj.collideV(d);
        break;
    }
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

// debug options event listeners
const keyDownHandler = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key == "Escape") {
    debugOptions.removeAttribute('hidden');
  }
}

// mouse events for rotating the canvas
function setupMouseListeners() {
  document.body.setAttribute('drag', "");
  mouseCapture.addEventListener("mousedown", mouseDownHandler);
  mouseCapture.addEventListener("mouseup", mouseUpHandler);
  mouseCapture.addEventListener("mousemove", mouseMoveHandler);
  document.body.addEventListener("keydown", keyDownHandler);
}

function removeMouseListeners() {
  document.body.removeAttribute('drag');
  isDragging = false;
  mouseCapture.removeEventListener("mousedown", mouseDownHandler);
  mouseCapture.removeEventListener("mouseup", mouseUpHandler);
  mouseCapture.removeEventListener("mousemove", mouseMoveHandler);
  document.body.removeEventListener("keydown", keyDownHandler);

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
  levelDoors = [];
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
        levelDoors.unshift(new HDoor(d[1], d[2], d[3], d[4]));
        prevX = d[3];
        prevY = d[2];
        break;
      case 'vdoor': // vertical line
        levelDoors.unshift(new VDoor(d[1], d[2], d[3], d[4]));
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
});

debugWarpButton.addEventListener('click', (e) => {
  let lvl = parseInt(debugWarpCounter.value);
  gotoLevel(lvl);
  debugOptions.setAttribute("hidden", "");
});

function gotoLevel(l) {
  level = l;
  loadLevel(levelData[level]);
}

function checkDoors() {
  for (l of levelLines) {
    if (l.constructor.name == "Plate") {
      if (l.objects > 0) {
        l.objects = 0;
        l.color = colors.platePressed;
        openDoors(l.id, true);
      } else {
        openDoors(l.id, false);
        l.color = colors.plate;
      }
    }
  }
}

function openDoors(id, state) {
  for (d of levelDoors) {
    if (d.id == id) {
      d.open = (state == null ? true : state);
    }
  }
}
