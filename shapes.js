class Drawer {
	constructor(svg) {
		this.drawer = svg.group();
	}

	draw_circle({ radius }) {
		const circle = this.drawer
			.circle(2 * radius)
			.stroke({ width: 3, color: "black" })
			.fill("transparent")
			.dmove(-radius, -radius);

		return circle;
	}

	draw_ring({ radius, thickness }) {
		const group = this.drawer.group();

		const ring = group
			.circle(2 * radius - thickness)
			.stroke({ width: thickness, color: "white" })
			.fill("transparent")
			.dmove(-radius + thickness / 2, -radius + thickness / 2);

		const circle = this.draw_circle({ radius: radius - thickness });
		const circle2 = this.draw_circle({ radius: radius });

		return group;
	}

	draw_rounded_text({ radius, text }, fontSettings = {}) {
		const obj = this.drawer
			.textPath(`${text}`, generate_circle_path(radius))
			.font(fontSettings)
			.attr("textLength", `${2 * radius * Math.PI}`);

		this.drawer.add(obj.track().fill("transparent"));

		return obj;
	}

	draw_line({ x1, y1, x2, y2 }, drawer = this.drawer) {
		return drawer.line(x1, y1, x2, y2).stroke({ width: 3, color: "black" });
	}

	draw_shape({ radius, vertices }) {
		const points = points_ngon(radius, vertices);
		const group = this.drawer.group();

		points.forEach((vector) => this.draw_line(vector, group));

		return group;
	}

	draw_offseted({ radius, vertices, steps }) {
		let r = radius;

		for (let i = 0; i < steps; i++) {
			this.draw_shape({ radius: r, vertices: vertices }).rotate((i * 180) / vertices, 0, 0);
			r = r * Math.cos(deg2rad(180 / vertices));
		}
	}

	draw_glyphs({ radius, glyphs }) {
		this.draw_rounded_text({ radius: radius, text: glyphs.join(" ") }, { size: 40, weight: "bold" });
	}
}
