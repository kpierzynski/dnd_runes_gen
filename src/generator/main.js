import Drawer from "./shapes";

import { points_circle } from "./points";

class Rune {
	constructor(canvas) {
		this.drawer = new Drawer(canvas);
	}

	draw({ ring, glyph, lines, planets }) {
		const drawer = this.drawer;
		drawer.clear();

		drawer.draw_ring({ radius: ring.radius, thickness: ring.thickness });

		drawer.draw_rounded_text(
			{
				radius: ring.radius,
				thickness: ring.thickness,
				text: ring.text
			},
			{ size: ring.text_size, weight: "bold" }
		);

		if (lines)
			lines.forEach(({ vertices, steps }) => {
				drawer.draw_offseted({
					radius: ring.radius - ring.thickness,
					vertices: vertices,
					steps: steps
				});
			});

		if (glyph) drawer.draw_glyphs({ radius: glyph.radius, glyphs: glyph.glyphs, size: glyph.size });

		if (planets)
			this.slots = planets.center
				? [{ x: 0, y: 0 }, ...points_circle(ring.radius, planets.slots)]
				: points_circle(ring.radius, planets.slots);

		return drawer;
	}

	getSlots() {
		return this.slots;
	}
}

export default Rune;
