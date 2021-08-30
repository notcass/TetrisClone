/// <reference path="libraries/p5.global-mode.d.ts" />

/**
 * TODO LIST
 *  DONE -- Collision with walls
 *
 *  DONE -- Array of all tetros on screen
 *
 *  DONE -- Collision with other tetrominos
 *
 *  DONE -- Row Clearing
 *
 *  DONE -- Collision check inside rotate function
 *
 *  DONE -- Falling Animation
 *
 *  DONE -- When tetro gets to 'floor', set to dead, spawn new
 *
 *  DONE -- Add Quick fall when 's' key held
 *
 *  DONE -- Instead of random block, generate a random sequence of each block, pick next block in sequence
 *
 *  DONE -- Add upcoming tetro
 *
 *  -- Add 3 upcoming tetros
 *
 *  -- Score
 *
 *  -- Hold 'a' or 'd' key to slide left and right
 *
 *  -- Add something special for a Tetris (clearing 4 rows at once?)
 *
 *  -- Button to swap current Tetro for upcoming one
 */

/**
 * BUG LIST
 *  FIXED -- Can collide past the floor
 *
 *   -- VERY RARELY a single or a few blocks will fall slightly too far
 *          This seems to happen during the fastfall animation.
 *          Hacky fix could be to check for deadblocks y values
 *          that aren't divisible by cubesize, then bump to nearest
 *          spot.
 */

let playfield;
let curTetro;
let song;
let backgroundImg;

function preload() {
  soundFormats('mp3');
  song = loadSound('assets/Tetris.mp3');
  backgroundImg = loadImage('assets/mountain.jpg');
  // backgroundImg = loadImage('assets/city.jpg');
}

function setup() {
  let canvas = createCanvas(1000, 950);
  canvas.parent('sketch-holder');
  resetGame();
  // song.play();
}

function resetGame() {
  playfield = new Playfield();

  // Testing Blocks at the bottom
  // curTetro = new Tetromino(playfield, 1);
  // curTetro.x = 320;
  // curTetro.y = 905;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 2);
  // curTetro.x = 320;
  // curTetro.y = 815;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 3);
  // curTetro.x = 410;
  // curTetro.y = 905;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 3);
  // curTetro.x = 500;
  // curTetro.y = 905;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 3);
  // curTetro.x = 590;
  // curTetro.y = 905;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 0);
  // curTetro.x = 455;
  // curTetro.y = 815;
  // playfield.killTetro(curTetro);

  // curTetro = new Tetromino(playfield, 3);
  // curTetro.x = 590;
  // curTetro.y = 815;
  // playfield.killTetro(curTetro);

  // Active Block
  playfield.spawnTetro();
  playfield.upcomingTetro = curTetro.tetros[playfield.upcomingTetroType];

  curTetro.updateCoords(curTetro.tetros[curTetro.type]);
}

function draw() {
  // background(0);
  image(backgroundImg, 0, 0, width, height);
  // playfield.show();
  playfield.showBorder();
  playfield.update();
  curTetro.show();

  // Testing
  // curTetro.drawCoords();
  // showRowVals();
  playfield.showUpcoming();
  // playfield.hideTetro();
}

function keyPressed() {
  if (key === 'w' || key === 'a' || key === 'd') {
    curTetro.move(key);
  }
  if (key === 'e') {
    curTetro.rotate();
  }
  if (key === '1') {
    if (curTetro.type > 0) curTetro.type--;
  }
  if (key === '2') {
    if (curTetro.type < 6) curTetro.type++;
  }
  if (key === '3') {
    curTetro.x = mouseX;
    curTetro.y = mouseY;
    // playfield.showUpcoming();
  }
  if (key === '4') {
    playfield.killTetro(curTetro);
    let randBlock = floor(random(7));
    curTetro = new Tetromino(playfield, randBlock);
  }
  if (key === 'q') {
    isLooping() ? noLoop() : loop();
  }
  if (key === 'r') {
    redraw();
  }
  if (key === 't') {
    for (let i = 0; i < playfield.deadBlocks.length; i++) {
      playfield.deadBlocks[i].y -= i * 3;
    }
  }
}

// Testing Functions
function showRowVals() {
  for (let y = playfield.y; y <= height; y += 45) {
    fill(255);
    text(y, playfield.x - 45, y + 20);
  }
}

function logRows(y) {
  let rows = [];
  playfield.deadBlocks.forEach((b) => {
    if (b.y == y) {
      console.log(b);
      rows.push(b);
    }
  });
  return rows;
}
