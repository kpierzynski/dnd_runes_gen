var canvas = SVG().addTo("#drawing").size("100%", "100%");

radius = 223;

const center = { x: 350, y: 350 };

function polar2cart(r, angle) {
	return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function deg2rad(deg) {
	return (Math.PI * deg) / 180;
}

function approx_circle(r, point_count) {
	const step = (2 * Math.PI) / point_count;
	const result = [];

	for (let i = 0; i < point_count; i++) {
		result.push(polar2cart(r, (3 * Math.PI) / 2 + i * step));
	}

	return result;
}

function generate_circle_path(r, origin = { x: center.x, y: center.y }) {
	const { x, y } = origin;
	return `M ${x},${y} m ${-r} 0 a ${r}, ${r} 0 1,0 ${2 * r},0 a ${r},${r} 0 1,0 ${-2 * r},0`;
}

function draw_ngon(r, gon, origin = { cx: center.x, cy: center.y }) {
	const ring = approx_circle(r, gon);
	const { cx, cy } = origin;

	let result = [];

	for (let i = 0; i < ring.length; i++) {
		const { x, y } = ring[i];
		const { x: xn, y: yn } = ring[(i + 1) % ring.length];
		result.push({ x1: x, y1: y, x2: xn, y2: yn });
	}

	result = result.map((item) => {
		return {
			x1: item.x1 + cx,
			y1: item.y1 + cy,
			x2: item.x2 + cx,
			y2: item.y2 + cy
		};
	});

	return result;
}

function draw_star(r, gon, origin = { cx: center.x, cy: center.y }) {
	const ring = approx_circle(r, gon);
	const { cx, cy } = origin;
	const len = ring.length;

	let result = [];
	for (let i = 0; i < len - 1; i++) {
		for (let k = i + 2; k < len; k++) {
			if (Math.abs(i - k) % (len - 1) === 0) continue;
			result.push({ x1: ring[i].x, y1: ring[i].y, x2: ring[k].x, y2: ring[k].y });
		}
	}

	result = result.map((item) => {
		return {
			x1: item.x1 + cx,
			y1: item.y1 + cy,
			x2: item.x2 + cx,
			y2: item.y2 + cy
		};
	});

	return result;
}

function draw_skip_two(r, gon, origin = { cx: center.x, cy: center.y }) {
	const ring = approx_circle(r, gon / 2);
	const { cx, cy } = origin;

	let result = [];

	for (let i = 0; i < ring.length; i++) {
		const { x, y } = ring[i];
		const { x: xn, y: yn } = ring[(i + 1) % ring.length];
		result.push({ x1: x, y1: y, x2: xn, y2: yn });
	}

	result = result.map((item) => {
		return {
			x1: item.x1 + cx,
			y1: item.y1 + cy,
			x2: item.x2 + cx,
			y2: item.y2 + cy
		};
	});

	return result;
}

function draw_center_line(r, gon, origin = { cx: center.x, cy: center.y }) {
	const ring = approx_circle(r, gon);
	const { cx, cy } = origin;
	const len = ring.length;

	let result = [];

	for (let i = 0; i < len; i++) {
		result.push({ x1: cx, y1: cy, x2: ring[i].x + cx, y2: ring[i].y + cy });
	}

	return result;
}

function rune(
	text,
	gon,
	ngon_enable = 0,
	mini_ngon_enable = 0,
	skip_two_enable = 0,
	star_enable = 0,
	center_line_enable = 0,
	circle_enable = 0
) {
	canvas.clear();

	let r = 230;
	if (ngon_enable)
		draw_ngon(r, gon).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 1, color: "gray" })
				.rotate(360 / gon / 2, center.x, center.y)
		);

	r = r * Math.cos(deg2rad(180 / gon));
	if (mini_ngon_enable)
		draw_ngon(r, gon).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 1, color: "gray" })
				.rotate(0, center.x, center.y)
		);

	//r = r * Math.cos(deg2rad(180 / gon));
	if (skip_two_enable)
		if (gon % 2 === 0)
			draw_skip_two(r, gon).forEach((point) =>
				canvas
					.line(point.x1, point.y1, point.x2, point.y2)
					.stroke({ width: 1, color: "gray" })
					.rotate((180 / gon) * 2, center.x, center.y)
			);

	function ring(text, r, th) {
		const a = canvas
			.circle(2 * r)
			.stroke("gray")
			.fill("white")
			.move(center.x - r, center.y - r);
		const b = canvas
			.circle(2 * r - 2 * th)
			.stroke("gray")
			.fill("transparent")
			.move(th, th)
			.move(center.x - (r - th), center.y - (r - th));
		const c = canvas
			.textPath(`${text}`, generate_circle_path(r - (3 * th) / 2))
			.attr("textLength", `${2 * (r - th) * Math.PI}`);
	}

	ring(text, 250, 20);

	//r = r * Math.cos(deg2rad(180 / gon));
	if (star_enable)
		draw_star(r, gon).forEach((point) =>
			canvas.line(point.x1, point.y1, point.x2, point.y2).stroke({ width: 1, color: "gray" })
		);

	if (center_line_enable)
		draw_center_line(230, gon).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 1, color: "gray" })
				.rotate(180 / gon, center.x, center.y)
		);

	if (circle_enable)
		approx_circle(240, gon).forEach((point) => {
			d = 75;
			canvas
				.circle(d)
				.move(point.x + center.x - d / 2, point.y + center.y - d / 2)
				.fill("white")
				.stroke({ width: 1, color: "gray" });

			const text = canvas.text("A");
			const width = text.length();
			const height = text.node.clientHeight;
			text.move(point.x + center.x - width / 2, point.y + center.y - height / 2);
		});

	ring("dupa trupa zakupy i chuj", 140, 20);
}

rune("very long banana words dupa image fill move canvas circle oh my god it is longer wtf ", 8, 1, 1, 1, 1, 1, 1);
