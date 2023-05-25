// setup canvas, timer and level elements on page
const canvas = document.getElementById("gameCanvas");
const levelText = document.querySelector(".level > span");
const timerText = document.querySelector(".timer > span");
// setup canvas rendering context
const ctx = canvas.getContext("2d");

// setup enemies array
let enemies = [];

let rotX = 0;
let rotY = 0;
let dragX = 0;
let dragY = 0;
let dragMouseX = 0;
let dragMouseY = 0;
let isDragging = false;
const playerSpeed = 1;
let level = 1;
let levelStarted = false;

let startTime;
let currentTime;

// run game loop
setInterval(game, 1 / 30);

// mouse events for rotating the canvas
document.body.addEventListener("mousedown", e => {
  if (!levelStarted) {
    levelStarted = true;
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

// game loop
function game() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // update game objects
  updateObjects();

  // draw game objects
  for (e of enemies) {
    e.drawBall();
  }
  player.drawBall();

  // update timer and level counter
  if (levelStarted) {
    currentTime = new Date();
    timerText.textContent = formatTimer(Math.round((currentTime - startTime) / 1000));
    levelText.textContent = level;
  }
}

// update game objects
function updateObjects() {
  player.updatePosition();
  player.checkEdges();
  for (e of enemies) {
    e.updatePosition();
    e.checkEdges();
  }
}

// format timer as MM:SS
function formatTimer(s) {
  let min = Math.floor(s / 60);
  let sec = s % 60;
  return (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

// create player object
let player = new Ball(0, 480, "#f00");
// create enemy objects
for (let i = 0; i < 5; i++) {
  x = Math.random() * 480;
  y = Math.random() * 480;
  enemies[i] = new Ball(x, y, "#00f");
}

// convert locations on canvas so 0,0 = center
function convertCoordX(x) {
  return x - canvas.width / 2;
}
function convertCoordY(y) {
  return y - canvas.height / 2;
}