import { G } from "@svgdotjs/svg.js";
import { generate_circle_path, rad2deg, deg2rad, polar2cart } from "./../util/tools";
import { points_circle, points_center, points_ngon, points_star } from "./points";

import "./../assets/fonts/DUNGRG.ttf";

class Drawer extends G {
	constructor(canvas, colors = { text: "black", bg: "white" }) {
		super();
		canvas.add(this);
		this.colors = colors;
	}

	draw_circle({ radius }, fill = "transparent") {
		const circle = this.circle(2 * radius)
			.stroke({ width: 2, color: this.colors.text })
			.fill(fill)
			.dmove(-radius, -radius);

		return circle;
	}

	draw_ring({ radius, thickness, transparent }) {
		const group = this.group();
		const color = transparent ? "transparent" : this.colors.bg;

		const ring = group
			.circle(2 * radius - thickness)
			.stroke({ width: thickness, color: this.colors.bg })
			.fill(color)
			.dmove(-radius + thickness / 2, -radius + thickness / 2);

		this.draw_circle({ radius: radius - thickness }, color);
		this.draw_circle({ radius: radius });

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
		const obj = this.textPath(text, path)
			.font({ fill: this.colors.text, family: "Dungeon" })
			.font(fontSettings)
			.attr("textLength", `${length}`);

		this.add(obj.track().fill("transparent"));

		return obj;
	}

	draw_line({ x1, y1, x2, y2 }, drawer = this) {
		return drawer.line(x1, y1, x2, y2).stroke({ width: 2, color: this.colors.text });
	}

	draw_shape({ radius, vertices }) {
		const points = points_ngon(radius, vertices);
		const group = this.group();

		points.forEach((vector) => this.draw_line(vector, group));

		return group;
	}

	draw_center({ radius, vertices }) {
		const points = points_center(radius, vertices);
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

		return symbol
			.dmove(0, -symbol.y())
			.dmove(-width / 2, -height / 2)
			.font({ fill: this.colors.text });
	}

	draw_glyphs({ radius, glyphs, size, border }) {
		const { border: border_render, radius: border_radius } = border;
		const points = points_circle(radius, glyphs.length);
		points.forEach((point, i) => {
			if (border_render)
				this.circle(2 * border_radius)
					.stroke({ width: 2, color: this.colors.text })
					.fill(this.colors.bg)
					.dmove(-border_radius, -border_radius)
					.dmove(point.x, point.y);

			this.draw_letter({ letter: glyphs[i], size })
				.dmove(point.x, point.y)
				.rotate(rad2deg(Math.atan2(point.y, point.x)))
				.rotate(90);
		});
	}

	draw_star({ radius, vertices }) {
		const points = points_star(radius, vertices);
		const group = this.group();

		points.forEach((vector) => this.draw_line(vector, group));

		return group;
	}
}

export default Drawer;
