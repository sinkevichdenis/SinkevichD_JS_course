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
			paddleUpIndex: 50,
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
			startBallY: 70,
			dx: 2,
			dy: -2,
		};

		this.config = config || defaultConfig;
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');

		this.x = this.canvas.width / 2;
		this.y = this.canvas.height - this.config.startBallY;
		this.rightPressed = false;
		this.leftPressed = false;
		this.paddleX = (this.canvas.width - this.config.paddleWidth) / 2;
		this.paddleY = this.canvas.height - this.config.paddleHeight;
		this.paddleDownStatus = true;
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
		this.paddle.draw(this.paddleX, this.paddleY, config.paddleWidth, config.paddleHeight);
		this.ball.draw(this.x, this.y, config.ballRadius);
		this.collisionDetection(config);
		this.bar.drawScore(this.score);
		this.bar.drawLives(this.config.lives);

		//ball and up window border
		if (this.y <  config.ballRadius) {
			config.dy = -config.dy;
		}

		//paddle and right window border
		if (this.rightPressed && this.paddleX < canvas.width -  config.paddleWidth) {
			this.paddleX += 7;
		}

		//paddle and left window border
		if (this.leftPressed && this.paddleX > 0) {
			this.paddleX -= 7;
		}

		// ball and left/right window borders
		if (this.x <  config.ballRadius ||
			this.x > canvas.width -  config.ballRadius) {
			config.dx = -config.dx;
		}

		//ball and down window border (lose live or game over)
		if (this.y + config.ballRadius > canvas.height) {
			config.lives--;
			if (!config.lives) {
				alert('GAME OVER');
				document.location.reload();
			} else {
				this.x = canvas.width / 2;
				this.y = canvas.height - this.config.startBallY;
				config.dx = 2;
				config.dy = -2;
				this.paddleX = (canvas.width -  config.paddleWidth) / 2;
			}
		}

		this.x += config.dx;
		this.y += config.dy;

		this.reboundFromPaddle(this.config, this.paddleDownStatus);

		requestAnimationFrame(() => {
			this.draw(this.ctx, this.canvas, this.config);
		});
	}

	/**
	 * realise rebound ball from pedall
	 * @param config
	 * @param paddleDownStatus - is paddle downstairs
	 * @returns {boolean}
	 */
	reboundFromPaddle(config, paddleDownStatus) {
		if (this.x + config.ballRadius > this.paddleX
			&& this.x - config.ballRadius < this.paddleX + config.paddleWidth){

			if (!paddleDownStatus
				&& this.y + config.ballRadius > this.paddleY + config.paddleHeight){
				return false;
			}

			if (!paddleDownStatus
				&& this.y + config.ballRadius >= this.paddleY){
				this.y = this.paddleY - config.ballRadius;
			}

			if (this.y + config.ballRadius >= this.paddleY) {
				config.dy = -config.dy;
			}
		}
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
					this.x + config.ballRadius > b.x && this.x - config.ballRadius < b.x + config.brickWidth &&
					this.y + config.ballRadius > b.y && this.y - config.ballRadius < b.y + config.brickHeight) {

					config.dy = -config.dy;
					b.status--;
					this.score++;

					config.dx += config.dx * config.accelerate;
					config.dy += config.dy * config.accelerate;

					if (this.score === config.brickRowCount * config.brickColumnCount * config.bricksStrength) {
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
			} else if (e.keyCode === 32) {
				while (this.paddleY >= this.canvas.height  - this.config.paddleHeight - this.config.paddleUpIndex){
					this.paddleY--;
					this.paddleDownStatus = false;
					this.reboundFromPaddle(this.config, this.paddleDownStatus);
				}
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.keyCode === 39) {
				this.rightPressed = false;
			} else if (e.keyCode === 37) {
				this.leftPressed = false;
			} else if (e.keyCode === 32) {
				while (this.paddleY < this.canvas.height - this.config.paddleHeight){
					this.paddleY ++;
					this.paddleDownStatus = true;
					this.reboundFromPaddle(this.config, this.paddleDownStatus);
				}
			}
		});

		document.addEventListener('mousemove', (e) => {
			let mouseX = e.clientX - this.canvas.offsetLeft;

			switch(true){
			case mouseX <= this.config.paddleWidth/2:
				this.paddleX = 0;
				break;
			case mouseX >= this.canvas.width - this.config.paddleWidth/2:
				this.paddleX = this.canvas.width - this.config.paddleWidth;
				break;
			default:
				this.paddleX = mouseX - this.config.paddleWidth/2;
			}
		});
	}
}

new Game();
