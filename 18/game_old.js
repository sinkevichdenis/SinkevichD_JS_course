const config = {
	ballRadius: 10,
	paddleHeight: 10,
	paddleWidth: 75,
	mainFillColor: '#0095DD',
	mainStrokeColor: '#333',
	brickRowCount: 3,
	brickColumnCount: 5,
	brickWidth: 75,
	brickHeight: 20,
	brickPadding: 10,
	brickOffsetTop: 30,
	brickOffsetLeft: 30,
	accelerate:  0.1,
};

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;

// colors
const mainFillColor = '#0095DD';
const mainStrokeColor = '#333';

//bricks sizes
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const accelerate = 0.1;

let lives = 3;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let score = 0;



const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRowCount; r++) {
		bricks[c][r] = {x: 0, y: 0, status: 2};
	}
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);

function keyDownHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = true;
	} else if (e.keyCode === 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode === 39) {
		rightPressed = false;
	} else if (e.keyCode === 37) {
		leftPressed = false;
	}
}

function mouseMoveHandler(e) {
	let mouseX = e.clientX - canvas.offsetLeft;
	if(mouseX > 0 && mouseX < canvas.width) {
		paddleX = mouseX - paddleWidth / 2;
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = mainFillColor;
	ctx.strokeStyle = mainStrokeColor;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = mainFillColor;
	ctx.strokeStyle = mainStrokeColor;
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function drawBricks() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			if (bricks[c][r].status === 1 || bricks[c][r].status === 2) {
				let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = bricks[c][r].status === 2 ? mainFillColor : 'red';
				ctx.strokeStyle = mainStrokeColor;
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
}

function collisionDetection() {
	for (let c = 0; c < brickColumnCount; c++) {
		for (let r = 0; r < brickRowCount; r++) {
			const b = bricks[c][r];
			if ((b.status === 1 || b.status === 2) &&
				x > b.x &&
				x < b.x + brickWidth &&
				y > b.y &&
				y < b.y + brickHeight) {
				dy = -dy;
				b.status--;
				if (b.status === 0) {
					score++;
				}
				dx = dx + dx * accelerate;
				dy = dy + dy * accelerate;
				if (score === brickRowCount * brickColumnCount) {
					alert('You Win!!!');
					document.location.reload();
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = '16px Arial';
	ctx.fillStyle = mainFillColor;
	ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
	ctx.font = '18px';
	ctx.strokeStyle = mainStrokeColor;
	ctx.stroke();
	ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawPaddle();
	collisionDetection();
	drawScore();
	drawLives();
	drawBall();

	if (rightPressed && paddleX < canvas.width - paddleWidth) {

		if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - ballRadius) {
			dx = -dx;
		}

		paddleX += 7;

	} else if (leftPressed && paddleX > 0) {
		if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - ballRadius) {
			dx = -dx;
		}
		paddleX -= 7
	}

	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}

	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
		} else {
			lives--;
			if (!lives) {
				alert('GAME OVER');
				document.location.reload();
			} else {
				x = canvas.width / 2;
				y = canvas.height - 30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width - paddleWidth) / 2;
			}

		}
	}

	x += dx;
	y += dy;
	requestAnimationFrame(draw);
}

draw();