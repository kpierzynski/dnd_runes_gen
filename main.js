var canvas = SVG().addTo("#drawing").size("100%", "100%");

class Rune extends Drawer {
	constructor({ ring, glyph, lines, planets }) {
		super(canvas);
		this.ring = ring;
		this.glyph = glyph;
		this.lines = lines;
		this.planets = planets;
		this.planets.positions = points_circle(this.ring.radius, this.planets.slots);

		this.drawer = new Drawer(canvas);
		this.slots = [];
	}

	draw() {
		this.draw_ring({ radius: this.ring.radius, thickness: this.ring.thickness });
		this.draw_rounded_text(
			{
				radius: this.ring.radius + this.ring.thickness / 4,
				text: this.ring.text
			},
			{ size: this.ring.text_size, weight: "bold" }
		);
		this.lines.forEach(({ vertices, steps }) => {
			this.draw_offseted({
				radius: this.ring.radius - this.ring.thickness,
				vertices: vertices,
				steps: steps
			});
		});

		this.draw_glyphs({ radius: this.glyph.radius, glyphs: this.glyph.glyphs, size: this.glyph.size });

		this.planets.positions.forEach(({ x, y, obj }) => {
			if (!obj) return;
			this.add(obj);
			obj.draw().dmove(x, y);
		});

		return this;
	}

	add2slot(rune, pos) {
		this.planets.positions[pos].obj = rune;
		return this;
	}
}

const rune = new Rune({
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
});

const rune2 = new Rune({
	ring: {
		radius: 100,
		thickness: 20,
		text: "very long intense hard to read and write text to test curving",
		text_size: 12
	},
	glyph: {
		radius: 30,
		glyphs: random_runes(5),
		size: 20
	},
	lines: [
		{
			vertices: 5,
			steps: 2
		}
	],
	planets: {
		center: false,
		slots: 0
	}
});

const rune3 = new Rune({
	ring: {
		radius: 100,
		thickness: 20,
		text: "very long intense hard to read and write text to test curving",
		text_size: 12
	},
	glyph: {
		radius: 30,
		glyphs: random_runes(5),
		size: 20
	},
	lines: [
		{
			vertices: 5,
			steps: 2
		}
	],
	planets: {
		center: false,
		slots: 0
	}
});

const rune4 = new Rune({
	ring: {
		radius: 100,
		thickness: 20,
		text: "very long intense hard to read and write text to test curving",
		text_size: 12
	},
	glyph: {
		radius: 30,
		glyphs: random_runes(5),
		size: 20
	},
	lines: [
		{
			vertices: 5,
			steps: 2
		}
	],
	planets: {
		center: false,
		slots: 0
	}
});

rune.add2slot(rune2, 0).add2slot(rune3, 1).add2slot(rune4, 2).draw().dmove(450, 450);
