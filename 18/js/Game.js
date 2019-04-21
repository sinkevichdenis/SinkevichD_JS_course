import { Ball } from './Figures.js';
import { Paddle } from './Figures.js';
import { Bricks } from './Bricks.js';
import { Bar } from './Bar.js';

class Game {

	/**
	 * constructor
	 * @param {object} config - object with game's configurations
	 */
	constructor(config) {
		const defaultConfig = {
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
			bricksStrength: 3,
			accelerate: 0.1,
			lives: 3,
			dx: 2,
			dy: -2,
		};

		this.config = config || defaultConfig;
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');

		this.x = this.canvas.width / 2;
		this.y = this.canvas.height - 30;
		this.rightPressed = false;
		this.leftPressed = false;
		this.paddleX = (this.canvas.width - this.config.paddleWidth) / 2;
		this.score = 0;

		this.ball = new Ball(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddle = new Paddle(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.bar = new Bar(this.ctx, this.canvas, this.config);
		this.bricksObj = new Bricks(this.ctx, this.config);
		this.bricks = this.bricksObj.getBricksArr();

		this.draw(this.ctx, this.canvas, this.config);
		this.events();
	}

	/**
	 *  draw all game
	 * @param {object} ctx
	 * @param {object} canvas
	 * @param {object} config
	 */
	draw(ctx, canvas, config) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.bricksObj.draw();
		this.paddle.draw(this.paddleX, canvas.height - config.paddleHeight, config.paddleWidth, config.paddleHeight);
		this.ball.draw(this.x, this.y, config.ballRadius,);
		this.collisionDetection(config);
		this.bar.drawScore(this.score);
		this.bar.drawLives(this.config.lives);

		if (this.rightPressed && this.paddleX < canvas.width -  config.paddleWidth) {

			if (this.x > this.paddleX &&
				this.x < this.paddleX +  config.paddleWidth &&
				this.y + config.dy > canvas.height -  config.ballRadius) {
				config.dx = -config.dx;
			}
			this.paddleX += 7;

		} else if (this.leftPressed && this.paddleX > 0) {
			if (this.x > this.paddleX &&
				this.x < this.paddleX +  config.paddleWidth &&
				this.y + config.dy > canvas.height -  config.ballRadius) {
				config.dx = -config.dx;
			}
			this.paddleX -= 7;
		}

		if (this.x + config.dx <  config.ballRadius ||
			this.x + config.dx > canvas.width -  config.ballRadius) {
			config.dx = -config.dx;
		}

		if (this.y + config.dy <  config.ballRadius) {
			config.dy = -config.dy;
		} else if (this.y + config.dy > canvas.height -  config.ballRadius) {
			if (this.x > this.paddleX && this.x < this.paddleX +  config.paddleWidth) {
				config.dy = -config.dy;
			} else {
				config.lives--;
				if (!config.lives) {
					alert('GAME OVER');
					document.location.reload();
				} else {
					this.x = canvas.width / 2;
					this.y = canvas.height - 30;
					config.dx = 2;
					config.dy = -2;
					this.paddleX = (canvas.width -  config.paddleWidth) / 2;
				}
			}
		}

		this.x += config.dx;
		this.y += config.dy;

		requestAnimationFrame(() => {
			this.draw(this.ctx, this.canvas, this.config);
		});
	}

	/**
	 * detect moment when ball touches brick
	 * @param {object} config
	 */
	collisionDetection(config) {
		for (let c = 0; c < config.brickColumnCount; c++) {
			for (let r = 0; r < config.brickRowCount; r++) {
				const b = this.bricks[c][r];

				if ((b.status > 0) &&
					this.x > b.x && this.x < b.x + config.brickWidth &&
					this.y > b.y &&	this.y < b.y + config.brickHeight) {

					config.dy = -config.dy;
					b.status--;

					if (b.status === 0) {
						this.score++;
					}

					config.dx += config.dx * config.accelerate;
					config.dy += config.dy * config.accelerate;

					if (this.score === config.brickRowCount * config.brickColumnCount) {
						alert('You Win!!!');
						document.location.reload();
					}
				}
			}
		}
	}

	/**
	 * all asinc events
	 */
	events() {
		document.addEventListener('keydown', (e) => {
			if (e.keyCode === 39) {
				this.rightPressed = true;
			} else if (e.keyCode === 37) {
				this.leftPressed = true;
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.keyCode === 39) {
				this.rightPressed = false;
			} else if (e.keyCode === 37) {
				this.leftPressed = false;
			}
		});

		document.addEventListener('mousemove', (e) => {
			let mouseX = e.clientX - this.canvas.offsetLeft;
			if (mouseX > 0 && mouseX < this.canvas.width) {
				this.paddleX = mouseX - this.config.paddleWidth / 2;
			}
		});
	}
}

new Game();
