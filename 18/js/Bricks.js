import { Figures} from './Figures';

export class Bricks extends Figures{
	/**
	 * constructor
	 * @param {object} context
	 * @param {object} config
	 */
	constructor(context, config) {
		super(context, config.fillColor, config.strokeColor);
		this.config = config;
		this.bricks = [];

		this.create();
	}

	/**
	 * create brick's array
	 */
	create() {
		for (let c = 0; c < this.config.brickColumnCount; c++) {
			this.bricks[c] = [];
			for (let r = 0; r < this.config.brickRowCount; r++) {
				this.bricks[c][r] = { x: 0, y: 0, status: this.config.bricksStrength };
			}
		}
	}

	/**
	 * get brick's array
	 * @returns {Array}
	 */
	getBricksArr(){
		return this.bricks;
	}

	/**
	 * draw all bricks
	 */
	draw() {
		for (let c = 0; c < this.config.brickColumnCount; c++) {
			for (let r = 0; r < this.config.brickRowCount; r++) {

				if (this.bricks[c][r].status > 0) {
					let brickX = (c * (this.config.brickWidth + this.config.brickPadding)) + this.config.brickOffsetLeft;
					let brickY = (r * (this.config.brickHeight + this.config.brickPadding)) + this.config.brickOffsetTop;

					this.bricks[c][r].x = brickX;
					this.bricks[c][r].y = brickY;

					this.ctx.beginPath();
					this.ctx.rect(brickX, brickY, this.config.brickWidth, this.config.brickHeight);
					this.ctx.fillStyle =  this.bricks[c][r].status >= 3	?  this.mainFillColor
						: this.bricks[c][r].status === 2 ? 'green' : 'red';
					this.ctx.strokeStyle = this.mainStrokeColor;
					this.ctx.fill();
					this.ctx.stroke();
					this.ctx.closePath();
				}
			}
		}
	}
}