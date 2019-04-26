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

		//other params
		this.score = 0;

		this.ball = new Ball(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddleLeft = new Paddle(this.ctx, this.config.mainFillColor, this.config.mainStrokeColor);
		this.paddleRight = new Paddle(this.ctx, this.config.addFillColor, this.config.mainStrokeColor);
		/*this.bar = new Bar(this.ctx, this.canvas, this.config);*/

		this.draw(this.ctx, this.canvas, this.config);

	}

	draw(ctx, canvas, config) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		this.paddleLeft.draw(this.leftX, this.leftY, config.paddleWidth, config.paddleHeight);
		this.paddleRight.draw(this.rightX, this.rightY, config.paddleWidth, config.paddleHeight);
		this.ball.draw(this.x, this.y, config.ballRadius);
	}
}

new Game();