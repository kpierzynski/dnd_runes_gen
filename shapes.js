function draw_ring(drawer, { radius, thickness }) {
	const group = drawer.group();

	const ring = group
		.circle(2 * radius - thickness / 2)
		.stroke({ width: thickness, color: "white" })
		.fill("transparent")
		.dmove(-radius, -radius);

	const circle = draw_circle(group, { radius: radius - thickness });
	const circle2 = draw_circle(group, { radius: radius });

	return group;
}

function draw_circle(drawer, { radius }) {
	const circle = drawer
		.circle(2 * radius)
		.stroke({ width: 3, color: "black" })
		.fill("transparent")
		.dmove(-radius, -radius);

	return circle;
}

function draw_rounded_text(drawer, { radius, text }, fontSettings = {}) {
	const obj = drawer
		.textPath(`${text}`, generate_circle_path(radius))
		.font(fontSettings)
		.attr("textLength", `${2 * radius * Math.PI}`);

	drawer.add(obj.track().fill("transparent"));

	return obj;
}
