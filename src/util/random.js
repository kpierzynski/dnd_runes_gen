import { random_glyphs, random_words } from "../assets/assets";

function random_rune(name, depth = 1) {
	const scale = depth / 2;

	const settings = {
		name: name,
		position: Math.round(Math.random() * 3),
		planets: random_normal(3, 6)
	};

	const radius = ~~(random_normal(50, 250) / scale);
	const ring = {
		radius: radius,
		thickness: random_normal(20, 60),
		transparent_center: random_normal() > 0.5,
		text: random_normal() > 0.5 ? random_words(random_normal(10, 30)).join(" ") : "",
		text_size: random_normal(10, 20)
	};

	const glyph = {
		radius: ~~((((random_normal() * 2) / 3) * radius) / scale),
		size: random_normal(20, 60),
		border: random_normal() >= 0.5,
		glyphs: random_glyphs(random_normal(3, 16))
	};
	glyph.border_radius = random_normal(~~(glyph.size / 2), glyph.size);

	function generate_random_line() {
		return {
			vertices: random_normal(3, 8),
			steps: random_normal(1, 3)
		};
	}

	function generate_random_lines(length) {
		const items = [];
		for (let i = 0; i < length; i++) items.push(generate_random_line());
		return items;
	}

	const lines = {
		center_lines: random_normal() >= 0.5,
		center_lines_count: random_normal(3, 8),

		star: random_normal() >= 0.5,
		star_arm_count: random_normal(5, 8),

		lines: generate_random_lines(random_normal(1, 3))
	};

	return { settings, ring, glyph, lines };
}

function random_normal(a, b) {
	const v = 4;
	let r = 0;
	for (let i = v; i > 0; i--) {
		r += Math.random();
	}
	if (Number.isInteger(a) && Number.isInteger(b)) return ~~((b - a) * (r / v) + a);
	return r / v;
}

export { random_rune, random_normal, random_glyphs, random_words };
