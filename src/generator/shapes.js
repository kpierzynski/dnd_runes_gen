import { SVG, G, TextPath } from "@svgdotjs/svg.js";
import { generate_circle_path, rad2deg, deg2rad, polar2cart } from "./tools";
import { points_circle, points_center, points_ngon, points_star } from "./points";

class Drawer extends G {
	constructor(canvas) {
		super();
		canvas.add(this);
	}

	draw_circle({ radius }, fill = "transparent") {
		const circle = this.circle(2 * radius)
			.stroke({ width: 2, color: "black" })
			.fill(fill)
			.dmove(-radius, -radius);

		return circle;
	}

	draw_ring({ radius, thickness }) {
		const group = this.group();

		const ring = group
			.circle(2 * radius - thickness)
			.stroke({ width: thickness, color: "white" })
			.fill("transparent")
			.dmove(-radius + thickness / 2, -radius + thickness / 2);

		const circle = this.draw_circle({ radius: radius - thickness }, "white");
		const circle2 = this.draw_circle({ radius: radius });

		return group;
	}

	draw_rounded_text({ radius, thickness, text }, fontSettings = {}) {
		const test = this.text(text).font(fontSettings);
		let { height } = test.node.getBBox();
		height -= 6;
		test.remove();

		const r = radius - thickness / 2 - height / 2;

		const path = generate_circle_path(r);

		const length = 2 * r * Math.PI;
		const obj = this.textPath(text, path).font(fontSettings).attr("textLength", `${length}`);

		this.add(obj.track().fill("transparent"));

		return obj;
	}

	draw_line({ x1, y1, x2, y2 }, drawer = this) {
		return drawer.line(x1, y1, x2, y2).stroke({ width: 2, color: "black" });
	}

	draw_shape({ radius, vertices }) {
		const points = points_ngon(radius, vertices);
		const group = this.group();

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

	draw_letter({ letter, size }) {
		const symbol = this.text(letter).font({ size: size, weight: "bold" });
		const { width, height } = symbol.node.getBBox();

		return symbol.dmove(0, -symbol.y()).dmove(-width / 2, -height / 2);
	}

	draw_glyphs({ radius, glyphs, size }) {
		const points = points_circle(radius, glyphs.length);
		points.forEach((point, i) => {
			this.draw_letter({ letter: glyphs[i], size })
				.dmove(point.x, point.y)
				.rotate(rad2deg(Math.atan2(point.y, point.x)))
				.rotate(90);
		});
	}
}

export default Drawer;
