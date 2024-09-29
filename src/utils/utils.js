import schema from "./schema.js";

import { words, runes } from "./../assets/resources.js";
import { v4 as uuidv4 } from "uuid";

function polarToCartesian(r, theta) {
	const radians = (theta - 90) * (Math.PI / 180);
	const x = r * Math.cos(radians);
	const y = r * Math.sin(radians);
	return { x, y };
}

function generateSvgPath(x, y, radius) {
	return `M ${x - radius}, ${y} 
			a ${radius},${radius} 0 1,0 ${2 * radius},0 
			a ${radius},${radius} 0 1,0 ${-2 * radius},0`;
}

function generatePointsCloud(x, y, radius, count) {
	const points = [];

	for (let i = 0; i < count; i++) {
		const theta = (360 / count) * i;
		const { x: offsetX, y: offsetY } = polarToCartesian(radius, theta);
		const px = x + offsetX;
		const py = y + offsetY;

		points.push({ x: px, y: py });
	}

	return points;
}

function getRandomInt(min, max, factor = 1) {
	const rnd = Math.floor(Math.random() * (max - min + 1)) + min;
	return parseInt(rnd / factor);
}

function generateRandomObject(factor = 1) {
	console.log("factor", factor);
	return {
		name: uuidv4(),
		radius: getRandomInt(150, 250, factor),
		borderThickness: getRandomInt(30, 50, factor),
		thickness: getRandomInt(1, 3, factor),
		theta: parseInt(Math.random() * 360),
		transparentFill: Math.random() < 0.5,
		isInCenter: Math.random() < 0.5,
		textSize: getRandomInt(10, 30, factor),
		centerLines: getRandomInt(3, 10, factor),
		sideLines: getRandomInt(3, 10, factor),
		text: words.randomChoice(getRandomInt(10, 30)).join(" "),
		glyphs: {
			symbols: runes.randomChoice(getRandomInt(3, 12)).join(""),
			radius: getRandomInt(150, 350, factor),
			borderThickness: getRandomInt(30, 50, factor),
			size: getRandomInt(30, 60, factor),
		},
		children: [],
	};
}

const generateRandomRune = (factor) => generateRandomObject((factor = factor));

export {
	generateRandomRune,
	getRandomInt,
	polarToCartesian,
	generateSvgPath,
	generatePointsCloud,
};
