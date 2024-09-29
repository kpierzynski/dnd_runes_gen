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
		transparentFill: false,
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

function generateRandom() {
	const initialRune = generateRandomRune(1);
	initialRune.name = "root";

	const childrenCount = getRandomInt(0, 3);

	initialRune.children = Array.from({ length: childrenCount }, () => {
		return generateRandomRune(2);
	});

	switch (initialRune.children.length) {
		case 0:
			break;

		case 1:
			initialRune.children[0].isInCenter = true;
			break;

		case 2:
			initialRune.children[0].isInCenter = false;
			initialRune.children[1].isInCenter = false;

			if (Math.random() < 0.5) {
				initialRune.children[0].theta = 0;
				initialRune.children[1].theta = 180;
			} else {
				initialRune.children[0].theta = 90;
				initialRune.children[1].theta = 270;
			}
			break;

		case 3:
			initialRune.children[0].isInCenter = false;
			initialRune.children[1].isInCenter = false;
			initialRune.children[2].isInCenter = false;

			if (Math.random() < 0.5) {
				initialRune.children[0].theta = 0;
				initialRune.children[1].theta = 120;
				initialRune.children[2].theta = 240;
			} else {
				initialRune.children[0].theta = 60;
				initialRune.children[1].theta = 180;
				initialRune.children[2].theta = 300;
			}
	}

	return initialRune;
}

export {
	generateRandomRune,
	getRandomInt,
	polarToCartesian,
	generateSvgPath,
	generatePointsCloud,
	generateRandom,
};
