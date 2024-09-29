const schema = {
	name: String,
	radius: Number,
	isInCenter: Boolean,
	borderThickness: Number,
	thickness: Number,
	theta: Number,
	transparentFill: Boolean,
	textSize: Number,
	centerLines: Number,
	sideLines: Number,
	text: String,
	glyphs: {
		symbols: String,
		radius: Number,
		borderThickness: Number,
		size: Number,
	},
	children: Array,
};

export default schema;
