// Import socket.io-client types
import { io, Socket } from "socket.io-client";
// Canvas Related
const canvas: HTMLCanvasElement = document.createElement('canvas');
const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
const socket: Socket = io('http://localhost:5000');

//client machine responsible for keeping track of ball position and score
let isReferee: boolean = false;
let paddleIndex: number = 0;

let width: number = 500;
let height: number = 700;

// Paddle
let paddleHeight: number = 10;
let paddleWidth: number = 50;
let paddleDiff: number = 25;
let paddleX: number[] = [225, 225];
let trajectoryX: number[] = [0, 0];
let playerMoved: boolean = false;

// Ball
let ballX: number = 250;
let ballY: number = 350;
let ballRadius: number = 5;
let ballDirection: number = 1;

// Speed
let speedY: number = 2;
let speedX: number = 0;

// Score for Both Players
let score: number[] = [0, 0];

// Create Canvas Element
function createCanvas(): void {
  canvas.id = 'canvas';
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  renderCanvas();
}

// Wait for Opponents
function renderIntro(): void {
  if (context) {
    // Canvas Background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Intro Text
    context.fillStyle = 'white';
    context.font = "32px Courier New";
    context.fillText("Waiting for opponent...", 20, (canvas.height / 2) - 30);
  }
}

// Render Everything on Canvas
function renderCanvas(): void {
  if (context) {
    // Canvas Background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    // Paddle Color
    context.fillStyle = 'white';

    // Bottom Paddle
    context.fillRect(paddleX[0], height - 20, paddleWidth, paddleHeight);

    // Top Paddle
    context.fillRect(paddleX[1], 10, paddleWidth, paddleHeight);

    // Dashed Center Line
    context.beginPath();
    context.setLineDash([4]);
    context.moveTo(0, 350);
    context.lineTo(500, 350);
    context.strokeStyle = 'grey';
    context.stroke();

    // Ball
    context.beginPath();
    //@ts-ignore
    context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
    context.fillStyle = 'white';
    context.fill();

    // Score
    context.font = "32px Courier New";
    context.fillText(score[0].toString(), 20, (canvas.height / 2) + 50);
    context.fillText(score[1].toString(), 20, (canvas.height / 2) - 30);
  }
}

// Reset Ball to Center
function ballReset(): void {
  ballX = width / 2;
  ballY = height / 2;
  speedY = 3;
  socket.emit('ballMove', {
    ballX,
    ballY,
    score,
  });
}

// Adjust Ball Movement
function ballMove(): void {
  // Vertical Speed
  ballY += speedY * ballDirection;
  // Horizontal Speed
  if (playerMoved) {
    ballX += speedX;
  }
  socket.emit('ballMove', {
    ballX,
    ballY,
    score,
  });
}

// Determine What Ball Bounces Off, Score Points, Reset Ball
function ballBoundaries(): void {
  // Bounce off Left Wall
  if (ballX < 0 && speedX < 0) {
    speedX = -speedX;
  }
  // Bounce off Right Wall
  if (ballX > width && speedX > 0) {
    speedX = -speedX;
  }
  // Bounce off player paddle (bottom)
  if (ballY > height - paddleDiff) {
    if (ballX >= paddleX[0] && ballX <= paddleX[0] + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      ballDirection = -ballDirection;
      trajectoryX[0] = ballX - (paddleX[0] + paddleDiff);
      speedX = trajectoryX[0] * 0.3;
    } else {
      // Reset Ball, add to Computer Score
      ballReset();
      score[1]++;
    }
  }
  // Bounce off computer paddle (top)
  if (ballY < paddleDiff) {
    if (ballX >= paddleX[1] && ballX <= paddleX[1] + paddleWidth) {
      // Add Speed on Hit
      if (playerMoved) {
        speedY += 1;
        // Max Speed
        if (speedY > 5) {
          speedY = 5;
        }
      }
      ballDirection = -ballDirection;
      trajectoryX[1] = ballX - (paddleX[1] + paddleDiff);
      speedX = trajectoryX[1] * 0.3;
    } else {
      ballReset();
      score[0]++;
    }
  }
}

// Called Every Frame
function animate(): void {
  if (isReferee) {
    ballMove();
    ballBoundaries();
  }
  renderCanvas();
  window.requestAnimationFrame(animate);
}

// Load Game, Reset Everything
function loadGame(): void {
  createCanvas();
  renderIntro();
  socket.emit('ready');
}

function startGame(): void {
  paddleIndex = isReferee ? 0 : 1;
  window.requestAnimationFrame(animate);
  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    playerMoved = true;
    paddleX[paddleIndex] = e.offsetX;
    if (paddleX[paddleIndex] < 0) {
      paddleX[paddleIndex] = 0;
    }
    if (paddleX[paddleIndex] > (width - paddleWidth)) {
      paddleX[paddleIndex] = width - paddleWidth;
    }
    socket.emit('paddleMove', {
      xPosition: paddleX[paddleIndex],
    });
    // Hide Cursor
    canvas.style.cursor = 'none';
  });
}

// On Load
loadGame();

socket.on('connect', () => {
    console.log('connected as....', socket.id);
    // socket.id = socket.id;
});
socket.on('startGame', (refereeId: string) => {
    console.log('Referee is', refereeId);
    if (socket.id === refereeId) {
        isReferee = true;
    }
    startGame();
});
socket.on('ballMove', (data: any) => {
      ballX = data.ballX;
      ballY = data.ballY;
      score = data.score;
});
socket.on('paddleMove', (paddleData: any) => {
    console.log('paddleMove', paddleData);
    console.log('isReferee', isReferee);
    console.log('paddleIndex', paddleIndex);
    let RivalPadelIndex = !isReferee ? 0 : 1;
    paddleX[RivalPadelIndex] = paddleData.xPosition;
});
