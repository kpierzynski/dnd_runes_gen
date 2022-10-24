var canvas = SVG().addTo("#drawing").size("100%", "100%");

class Rune {
	constructor() {
		this.drawer = new Drawer(canvas);
	}

	draw({ ring, glyph, lines, planets }) {
		const drawer = this.drawer;
		drawer.clear();

		drawer.draw_ring({ radius: ring.radius, thickness: ring.thickness });

		drawer.draw_rounded_text(
			{
				radius: ring.radius + ring.thickness / 4,
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

schema = {
	ring: {
		radius: 300,
		thickness: 30,
		text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text",
		text_size: 20
	},
	glyph: {
		radius: 160,
		glyphs: random_runes(5),
		size: 50
	},
	lines: [
		{
			vertices: 8,
			steps: 4
		}
	],
	planets: {
		center: true,
		slots: 3
	}
};

const rune = new Rune();
rune.draw(schema).dmove(400, 400);
