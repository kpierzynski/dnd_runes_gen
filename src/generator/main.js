import Drawer from "./shapes";

import { points_circle } from "./points";

class Rune {
	constructor(canvas, colors) {
		this.drawer = new Drawer(canvas, colors);
	}

	draw({ ring, glyph, lines, settings }) {
		const drawer = this.drawer;
		drawer.clear();

		drawer.draw_ring({ radius: ring.radius, thickness: ring.thickness, transparent: settings.transparent_center });

		drawer.draw_rounded_text(
			{
				radius: ring.radius,
				thickness: ring.thickness,
				text: ring.text
			},
			{ size: ring.text_size }
		);

		if( lines.center_lines ) drawer.draw_center({radius: ring.radius-ring.thickness, vertices: lines.center_lines_count})

		if (lines)
			lines.lines.forEach(({ vertices, steps }) => {
				drawer.draw_offseted({
					radius: ring.radius - ring.thickness,
					vertices: vertices,
					steps: steps
				});
			});

		if (glyph) drawer.draw_glyphs({ radius: glyph.radius + 1, glyphs: glyph.glyphs, size: glyph.size });

		return drawer;
	}
}

export default Rune;
