var canvas = SVG().addTo("#drawing").size("100%", "100%");

class Rune {
	constructor() {
		this.drawer = new Drawer(canvas);
		this.planets = [];
	}

	draw() {
		const drawer = this.drawer;

		drawer.draw_ring({ radius: 300, thickness: 30 });
		drawer.draw_rounded_text(
			{
				radius: 300 + 30 / 4,
				text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text"
			},
			{ size: 20, weight: "bold" }
		);
		drawer.draw_offseted({ radius: 300 - 30, vertices: 4, steps: 2 });
		drawer.draw_ring({ radius: 135, thickness: 30 });

		drawer.draw_glyphs({ radius: 250, glyphs: random_runes(10) });

		return drawer.drawer;
	}

	add(rune) {}
}

const rune = new Rune();

rune.draw().dmove(350, 350);
