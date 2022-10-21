function approx_circle(r, point_count) {
	const step = (2 * Math.PI) / point_count;
	const rotate = (3 * Math.PI) / 2;

	const result = [];
	for (let i = 0; i < point_count; i++) {
		result.push(polar2cart(r, rotate + i * step));
	}

	return result;
}
function draw_ngon(r, gon, origin = { cx: 0, cy: 0 }) {
	const ring = approx_circle(r, gon);
	const { cx, cy } = origin;

	let result = [];
	for (let i = 0; i < ring.length; i++) {
		const { x, y } = ring[i];
		const { x: xn, y: yn } = ring[(i + 1) % ring.length];
		result.push({ x1: x + cx, y1: y + cy, x2: xn + cx, y2: yn + cy });
	}

	return result;
}

function draw_star(r, gon, origin = { cx: 0, cy: 0 }) {
	const ring = approx_circle(r, gon);
	const len = ring.length;
	const { cx, cy } = origin;

	let result = [];
	for (let i = 0; i < len - 1; i++) {
		for (let k = i + 2; k < len; k++) {
			if (Math.abs(i - k) % (len - 1) === 0) continue;
			result.push({ x1: ring[i].x + cx, y1: ring[i].y + cy, x2: ring[k].x + cx, y2: ring[k].y + cy });
		}
	}

	return result;
}

function draw_skip_two(r, gon, origin = { cx: 0, cy: 0 }) {
	const ring = approx_circle(r, gon / 2);
	const { cx, cy } = origin;

	let result = [];
	for (let i = 0; i < ring.length; i++) {
		const { x, y } = ring[i];
		const { x: xn, y: yn } = ring[(i + 1) % ring.length];
		result.push({ x1: x + cx, y1: y + cy, x2: xn + cx, y2: yn + cy });
	}

	return result;
}

function draw_center_line(r, gon, origin = { cx: 0, cy: 0 }) {
	const ring = approx_circle(r, gon);
	const len = ring.length;
	const { cx, cy } = origin;

	let result = [];
	for (let i = 0; i < len; i++) {
		result.push({ x1: cx, y1: cy, x2: ring[i].x + cx, y2: ring[i].y + cy });
	}

	return result;
}
