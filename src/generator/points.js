import { generate_circle_path, polar2cart, rad2deg, deg2rad } from "./tools";

function points_circle(r, point_count) {
	const step = (2 * Math.PI) / point_count;
	const rotate = (3 * Math.PI) / 2;

	const result = [];
	for (let i = 0; i < point_count; i++) {
		result.push(polar2cart(r, rotate + i * step));
	}

	return result;
}

function points_ngon(r, gon) {
	const ring = points_circle(r, gon);

	let result = [];
	for (let i = 0; i < ring.length; i++) {
		const { x, y } = ring[i];
		const { x: xn, y: yn } = ring[(i + 1) % ring.length];
		result.push({ x1: x, y1: y, x2: xn, y2: yn });
	}

	return result;
}

function points_star(r, gon) {
	const ring = points_circle(r, gon);
	const len = ring.length;

	let result = [];
	for (let i = 0; i < len - 1; i++) {
		for (let k = i + 2; k < len; k++) {
			if (Math.abs(i - k) % (len - 1) === 0) continue;
			result.push({ x1: ring[i].x, y1: ring[i].y, x2: ring[k].x, y2: ring[k].y });
		}
	}

	return result;
}

function points_center(r, gon) {
	const ring = points_circle(r, gon);
	const len = ring.length;

	let result = [];
	for (let i = 0; i < len; i++) {
		result.push({ x1: 0, y1: 0, x2: ring[i].x, y2: ring[i].y });
	}

	return result;
}

export { points_center, points_circle, points_ngon, points_star };
