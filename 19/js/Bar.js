export class Bar{
	/**
	 * constructor
	 * @param {object} context
	 * @param {object} canvas
	 * @param {object} config
	 */
	constructor(context, canvas, config) {
		this.ctx = context;
		this.canvas = canvas;
		this.config = config;
	}

	/**
	 * draw lives on display
	 * @param {number} lives
	 */
	drawLives(lives) {
		this.ctx.font = '18px';
		this.ctx.strokeStyle = this.config.mainStrokeColor;
		this.ctx.stroke();
		this.ctx.fillText(`Lives: ${lives}`, this.canvas.width - 65, 20);
	}

	/**
	 * draw score on display
	 * @param {number} score
	 */
	drawScore(score) {
		let maxScore = this.config.brickRowCount * this.config.brickColumnCount * this.config.bricksStrength;
		this.ctx.font = '16px Arial';
		this.ctx.fillStyle = this.config.mainFillColor;
		this.ctx.fillText(`Score: ${score} / ${maxScore}`, 8, 20);
	}
}
