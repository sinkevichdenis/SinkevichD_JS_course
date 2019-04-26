export class Figures {
	/** constructor for all figures
	 * @param {object} context  - context for drawing
	 * @param {string} fillColor - inner color
	 * @param {string} strokeColor - outer color
	 */
	constructor(context, fillColor, strokeColor) {
		this.ctx = context;
		this.fillColor = fillColor;
		this.strokeColor = strokeColor;
	}
}

export class Ball extends Figures{
	constructor(context, fillColor, strokeColor) {
		super(context, fillColor, strokeColor);
	}

	/**
	 * draw ball
	 * @param {number} x - start X-coordinate
	 * @param {number} y - start Y-coordinate
	 * @param {number} radius - ball's radius
	 */
	draw(x, y, radius) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, 0, Math.PI * 2);
		this.ctx.fillStyle = this.fillColor;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}
}

export class Paddle extends Figures{
	constructor(context, fillColor, strokeColor) {
		super(context, fillColor, strokeColor);
	}

	/**
	 * draw paddle
	 * @param {number} x - start X-coordinate
	 * @param {number} y - start Y-coordinate
	 * @param {number} width - paddle's width
	 * @param {number} height - paddle's height
	 */
	draw(x, y, width, height) {
		this.ctx.beginPath();
		this.ctx.rect(x, y, width, height);
		this.ctx.fillStyle = this.fillColor;
		this.ctx.strokeStyle = this.strokeColor;
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
	}

}