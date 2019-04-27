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
	 * draw score on display
	 * @param {number} scoreL
	 * @param {number} scoreR
	 */
	drawScore(scoreL, scoreR) {
		this.ctx.font = '20px Arial';
		this.ctx.fillStyle = this.config.mainStrokeColor;
		this.ctx.fillText(`${scoreL} : ${scoreR}`, this.canvas.width / 2 - 20, 20);
	}


}
