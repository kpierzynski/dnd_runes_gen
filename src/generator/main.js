import Drawer from "./shapes";

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

		lines.forEach(({ vertices, steps }) => {
			drawer.draw_offseted({
				radius: ring.radius - ring.thickness,
				vertices: vertices,
				steps: steps
			});
		});

		drawer.draw_glyphs({ radius: glyph.radius, glyphs: glyph.glyphs, size: glyph.size });

		return drawer;
	}
}

export default Rune;
