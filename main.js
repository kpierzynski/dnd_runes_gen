var canvas = SVG().addTo("#drawing").size("100%", "100%");

function rune(
	center,
	r,
	th,
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

	if (ngon_enable)
		draw_ngon(r - th, gon, (origin = center)).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 3, color: "black" })
				.rotate(180 / gon, center.cx, center.cy)
		);

	if (mini_ngon_enable)
		draw_ngon(r - th, gon, (origin = center)).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 3, color: "black" })
				.rotate(0, center.cx, center.cy)
		);

	if (skip_two_enable)
		draw_skip_two(r - th, gon, (origin = center)).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 3, color: "black" })
				.rotate((180 / gon) * 2, center.cx, center.cy)
		);

	function ring(text, r, th) {
		const white_ring = canvas
			.circle(2 * r - th)
			.stroke({ width: th, color: "white" })
			.fill("transparent")
			.move(th, th)
			.move(center.cx - (r - th / 2), center.cy - (r - th / 2));

		const border1 = canvas
			.circle(2 * r)
			.stroke({ width: 3, color: "black" })
			.fill("transparent")
			.move(center.cx - r, center.cy - r);
		const border2 = canvas
			.circle(2 * r - 2 * th)
			.stroke({ width: 3, color: "black" })
			.fill("transparent")
			.move(th, th)
			.move(center.cx - (r - th), center.cy - (r - th));

		const text_ring = canvas
			.textPath(`${text}`, generate_circle_path(r, (origin = center)))
			.font({ weight: "bold" })
			.attr("textLength", `${2 * r * Math.PI}`);
	}

	function text_circle(text, r, th) {
		const c = canvas
			.textPath(`${text}`, generate_circle_path(r - (2 * th) / 2, (origin = center)))
			.font({ size: 50 })
			.font({ weight: "bold" })
			.attr("textLength", `${2 * (r - th) * Math.PI}`);
	}

	ring(text, r, th);

	if (star_enable)
		draw_star(r - th, gon, (origin = center)).forEach((point) =>
			canvas.line(point.x1, point.y1, point.x2, point.y2).stroke({ width: 3, color: "black" })
		);

	if (center_line_enable)
		draw_center_line(r - th, gon, (origin = center)).forEach((point) =>
			canvas
				.line(point.x1, point.y1, point.x2, point.y2)
				.stroke({ width: 3, color: "black" })
				.rotate(180 / gon, center.cx, center.cy)
		);

	if (circle_enable)
		approx_circle(r - th + th / 2, gon, (origin = center)).forEach((point) => {
			d = 100;
			canvas
				.circle(d)
				.move(point.x + center.cx - d / 2, point.y + center.cy - d / 2)
				.fill("white")
				.stroke({ width: 3, color: "black" });

			const text = canvas.text("A").font({ size: 50 });

			const { width, height } = text.node.getBBox();
			text.move(point.x + center.cx - width / 2, point.y + center.cy - height / 2);
		});

	ring("dupa trupa zakupy i chuj", 140, 40);

	text_circle("A B C D E F G H .", 250, 10);
}

rune(
	{ cx: 350, cy: 350 },
	300,
	30,
	"very long banana words dupa image fill move canvas circle oh my god it is longer wtf very long banana words dupa image fill move canvas circle oh my god it is longer wtf",
	8,
	1,
	1,
	1,
	1,
	1,
	1
);
