import { Ball } from './Figures.js';
import { Paddle } from './Figures.js';
import { Bar } from './Bar.js';

class Game {
	/**
	 * constructor
	 * @param {object} config - object with game's configurations
	 */
	constructor(config) {
		const defaultConfig = {
			groundWidth: 600,
			groundHeight: 400,
			ballRadius: 10,
			paddleHeight: 75,
			paddleWidth: 10,
			paddleMoveIndex: 7,
			mainFillColor: '#0095DD',
			addFillColor: '#dd1915',
			mainStrokeColor: '#333',
			accelerate: 0.1,
			ballMoveIndex: 2,
		};

		//playground params
		this.config = config || defaultConfig;
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.config.groundWidth;
		this.canvas.height = this.config.groundHeight;

		//left paddle's coordinates
		this.leftX = 0;
		this.leftY = (this.canvas.height - this.config.paddleHeight) / 2;

		//right paddle's coordinates
		this.rightX = this.canvas.width - this.config.paddleWidth;
		this.rightY = (this.canvas.height - this.config.paddleHeight) / 2;

		//other params (null - don't move, true - move up, false - move down)
		this.leftMove = null;
		this.rightMove = null;
		this.leftScore = 0;
		this.rightScore = 0;

		this.ball = new Ball(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.ball.setColor('#333');
		this.paddleLeft = new Paddle(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddleRight = new Paddle(this.ctx, this.config.addFillColor, this.config.mainStrokeColor);
		this.bar = new Bar(this.ctx, this.canvas, this.config);

		this.draw(this.ctx, this.canvas, this.config);
		this.events();
		this.startBall();

	}

	/**
	 * draw and init config of all figures
	 * @param ctx
	 * @param canvas
	 * @param config
	 */
	draw(ctx, canvas, config) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.paddleLeft.draw(this.leftX, this.leftY, config.paddleWidth, config.paddleHeight);
		this.leftY = this.paddleMove(this.leftY, this.leftMove);
		this.paddleRight.draw(this.rightX, this.rightY, config.paddleWidth, config.paddleHeight);
		this.rightY = this.paddleMove(this.rightY, this.rightMove);

		this.ball.draw(this.x, this.y, config.ballRadius);
		this.reboundFromPaddle('left', this.leftX + this.config.paddleWidth, this.leftY);
		this.reboundFromPaddle('right', this.rightX, this.rightY);
		this.ballMove();

		this.bar.drawScore(this.leftScore, this.rightScore);

		requestAnimationFrame(() => {
			this.draw(this.ctx, this.canvas, this.config);
		});
	}

	/**
	 * count start ball coordinate and start game
	 */
	startBall() {
		alert(`${this.leftScore} : ${this.rightScore} START GAME?`);
		let angleGrad;
		do {
			angleGrad = Math.random() * 360;
			//remove +-20 grade angles near axes
		} while ((angleGrad >= 0 && angleGrad < 20)
				|| (angleGrad > 70	&& angleGrad < 110)
				|| (angleGrad > 160	&& angleGrad < 200)
				|| (angleGrad > 250	&& angleGrad < 290)
				|| (angleGrad > 340	&& angleGrad <= 360 ));

		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;
		this.angleRad = angleGrad *(Math.PI / 180);

		this.dx = Math.cos(this.angleRad) * this.config.ballMoveIndex;
		this.dy = Math.sin(this.angleRad) * this.config.ballMoveIndex;

		this.intId = setInterval(() => {
			//prevent ball's extreme accelerating
			if (Math.abs(this.dx) < 10 || Math.abs(this.dy) < 10){
				this.dx += this.dx * this.config.accelerate;
				this.dy += this.dy * this.config.accelerate;
			}
		}, 1000);
	}

	/**
	 * ball's movement behavior
	 */
	ballMove(){
		this.fixBorders();

		if (this.y - this.config.ballRadius <= 0
			|| (this.y + this.config.ballRadius >= this.canvas.height)) {
			this.dy = -this.dy;
		}

		if (this.x - this.config.ballRadius <= 0
			|| (this.x + this.config.ballRadius >= this.canvas.width)) {
			this.dx = 0;
			this.dy = 0;

			(this.x - this.config.ballRadius <= 0) && this.rightScore++;
			(this.x + this.config.ballRadius >= this.canvas.width) && this.leftScore++;

			clearInterval(this.intId);
			this.startBall();
		}

		this.x += this.dx;
		this.y += this.dy;
	}

	/**
	 * prevent ball crossing through borders
	 */
	fixBorders(){
		(this.y - this.config.ballRadius < 0) && (this.y = this.config.ballRadius);
		(this.y + this.config.ballRadius > this.canvas.height) && (this.y = this.canvas.height - this.config.ballRadius);
		(this.x - this.config.ballRadius < 0) && (this.x = this.config.ballRadius);
		(this.x + this.config.ballRadius > this.canvas.width) && (this.x = this.canvas.width - this.config.ballRadius);
	}

	/**
	 * ball's movement behavior
	 * @param {string} side - paddle's side
	 * @param {number} borderX - coordinate X of rebound from paddle
	 * @param {number} paddleY - paddle's coordinate Y
	 */
	reboundFromPaddle(side, borderX, paddleY) {
		if(this.y + this.config.ballRadius >= paddleY
			&& this.y - this.config.ballRadius<= paddleY + this.config.paddleHeight){

			if (side === 'right' && this.x + this.config.ballRadius >= borderX){
				this.ball.setColor(this.config.addFillColor);
				this.dx = -this.dx;
			}

			if (side === 'left' && this.x - this.config.ballRadius <= borderX) {
				this.ball.setColor(this.config.mainFillColor);
				this.dx = -this.dx;
			}
		}
	}

	/**
	 * paddle's movement behavior
	 * @param {number} coordY - start coordinate Y
	 * @param {boolean} direction - (null - don't move, true - move up, false - move down)
	 * @returns {number} - coordinate Y for paddle
	 */
	paddleMove(coordY, direction){
		if (direction && coordY >= 0) {
			coordY -= this.config.paddleMoveIndex;
		}

		if (direction === false && (coordY <= this.canvas.height - this.config.paddleHeight)) {
			coordY += this.config.paddleMoveIndex;
		}
		return coordY;
	}

	/**
	 * button's events
	 */
	events() {
		document.addEventListener('keydown', (e) => {
			switch(e.keyCode) {
			case 16:
				this.leftMove = true;
				break;
			case 17:
				this.leftMove = false;
				break;
			case 38:
				this.rightMove = true;
				break;
			case 40:
				this.rightMove = false;
				break;
			}
		});

		document.addEventListener('keyup', (e) => {
			if (e.keyCode === 16 || e.keyCode === 17) {
				this.leftMove = null;
			}
			if (e.keyCode === 38 || e.keyCode === 40) {
				this.rightMove = null;
			}
		});
	}
}

new Game();