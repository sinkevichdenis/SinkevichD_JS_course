import { Ball } from './Figures.js';
import { Paddle } from './Figures.js';
import { Bar } from './Bar.js';
import { Bricks } from '../../18/js/Bricks';

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
			startBallY: 70,
			dx: 2,
			dy: -2,
		};

		//playground params
		this.config = config || defaultConfig;
		this.canvas = document.getElementById('myCanvas');
		this.ctx = this.canvas.getContext('2d');
		this.canvas.width = this.config.groundWidth;
		this.canvas.height = this.config.groundHeight;

		//ball's coordinates
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;

		//left paddle's coordinates
		this.leftX = 0;
		this.leftY = (this.canvas.height - this.config.paddleHeight) / 2;

		//right paddle's coordinates
		this.rightX = this.canvas.width - this.config.paddleWidth;
		this.rightY = (this.canvas.height - this.config.paddleHeight) / 2;;

		//other params (null - don't move, true - move up, false - move down)
		this.leftMove = null;
		this.rightMove = null;
		this.score = 0;

		this.ball = new Ball(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddleLeft = new Paddle(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddleRight = new Paddle(this.ctx, this.config.addFillColor, this.config.mainStrokeColor);
		/*this.bar = new Bar(this.ctx, this.canvas, this.config);*/

		this.init(this.ctx, this.canvas, this.config);
		this.events();
	}

	init(ctx, canvas, config) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.paddleLeft.draw(this.leftX, this.leftY, config.paddleWidth, config.paddleHeight);
		this.leftY = this.paddleMove(this.leftY, this.leftMove);
		this.paddleRight.draw(this.rightX, this.rightY, config.paddleWidth, config.paddleHeight);
		this.rightY = this.paddleMove(this.rightY, this.rightMove);
		this.ball.draw(this.x, this.y, config.ballRadius);
		this.ballMove();

		requestAnimationFrame(() => {
			this.init(this.ctx, this.canvas, this.config);
		});
	}

	ballMove(){
		if (this.y <= this.config.ballRadius
			|| (this.y >= this.canvas.height - this.config.ballRadius)) {
			this.config.dy = -this.config.dy;
		}

		if (this.x < this.config.ballRadius
			|| (this.x > this.canvas.width -  this.config.ballRadius)) {
			this.config.dx = 0;
			this.config.dy = 0;
		}

		this.x += this.config.dx;
		this.y += this.config.dy;
	}

	paddleMove(coordY, direction){
		if (direction && coordY >= 0) {
			coordY -= this.config.paddleMoveIndex;
		}

		if (direction === false && (coordY <= this.canvas.height - this.config.paddleHeight)) {
			coordY += this.config.paddleMoveIndex;
		}
		return coordY;
	}

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