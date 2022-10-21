var canvas = SVG().addTo("#drawing").size("100%", "100%");

const runes = [
	"ᚡ",
	"ᚢ",
	"ᚣ",
	"ᚤ",
	"ᚥ",
	"ᚦ",
	"ᚧ",
	"ᚨ",
	"ᚩ",
	"ᚪ",
	"ᚫ",
	"ᚬ",
	"ᚭ",
	"ᚮ",
	"ᚯ",
	"ᚰ",
	"ᚱ",
	"ᚳ",
	"ᚴ",
	"ᚵ",
	"ᚶ",
	"ᚸ",
	"ᚹ",
	"ᚺ",
	"ᚻ",
	"ᚼ",
	"ᚽ",
	"ᚾ",
	"ᚿ",
	"ᛀ",
	"ᛂ",
	"ᛃ",
	"ᛄ",
	"ᛅ",
	"ᛆ",
	"ᛇ",
	"ᛈ",
	"ᛉ",
	"ᛊ",
	"ᛋ",
	"ᛍ",
	"ᛎ",
	"ᛏ",
	"ᛐ",
	"ᛑ",
	"ᛒ",
	"ᛓ",
	"ᛔ",
	"ᛗ",
	"ᛘ",
	"ᛙ",
	"ᛚ",
	"ᛛ",
	"ᛜ",
	"ᛝ",
	"ᛞ",
	"ᛟ",
	"ᛠ",
	"ᛡ",
	"ᛢ",
	"ᛣ",
	"ᛤ",
	"ᛥ",
	"ᛦ",
	"ᛧ",
	"ᛨ",
	"ᛩ",
	"ᛪ",
	"᛫",
	"ᛮ",
	"ᛯ",
	"ᛰ"
];

function random_runes(length) {
	return [...new Array(length)].map(() => Math.round(Math.random() * runes.length)).map((i) => runes[i]);
}

function rune({ center, ring: big_ring, glyph: inner_glyph, planets }) {
	const drawer = canvas.group();

	function text_circle(text, radius, fontSettings = {}, origin = { cx: 0, cy: 0 }) {
		return drawer
			.textPath(`${text}`, generate_circle_path(radius, (origin = origin)))
			.font(fontSettings)
			.attr("textLength", `${2 * radius * Math.PI}`);
	}

	function ring_border(radius, settings = {}, origin = { cx: 0, cy: 0 }) {
		return drawer
			.circle(2 * radius)
			.stroke({ width: 3, color: "black", ...settings })
			.fill("transparent")
			.move(origin.cx - radius, origin.cy - radius);
	}

	function ring(text, radius, th, settings = {}, origin = { cx: 0, cy: 0 }) {
		const white_ring = drawer
			.circle(2 * radius - th)
			.stroke({ width: th, color: "white" })
			.fill("white")
			.move(origin.cx - (radius - th / 2), origin.cy - (radius - th / 2));

		ring_border(radius, (settings = settings), (origin = origin));
		ring_border(radius - th, (settings = settings), (origin = origin));

		text_circle(text, radius, { weight: "bold" }, (origin = origin));
	}

	function line(point, settings = {}) {
		return drawer.line(point.x1, point.y1, point.x2, point.y2).stroke({ width: 3, color: "black", ...settings });
	}

	function glyph(letter, point, letterSettings = {}, origin = { cx: 0, cy: 0 }) {
		const text = drawer.text(letter.at(0)).font(letterSettings);
		const { width, height } = text.node.getBBox();
		text.move(point.x + origin.cx - width / 2, point.y + origin.cy - height / 2);
	}

	function circle(radius, point, settings = {}, origin = { cx: 0, cy: 0 }) {
		return drawer
			.circle(radius * 2)
			.move(point.x + origin.cx - radius, point.y + origin.cy - radius)
			.fill("white")
			.stroke({ width: 3, color: "black", ...settings });
	}

	{
		let { radius, thickness, text, gon, line: line_settings, settings } = big_ring;
		const { polygon, second_polygon, depleted_polygon, star_lines, center_lines } = settings;

		ring(text, radius, thickness, (settings = line_settings), (origin = center));

		if (polygon)
			ngon(radius - thickness, gon, (origin = center)).forEach((point) =>
				line(point, line_settings).rotate(180 / gon, center.cx, center.cy)
			);
		if (second_polygon)
			ngon(radius - thickness, gon, (origin = center)).forEach((point) =>
				line(point, line_settings).rotate(0, center.cx, center.cy)
			);
		if (depleted_polygon)
			ngon(radius - thickness, gon / 2, (origin = center)).forEach((point) =>
				line(point, line_settings).rotate(360 / gon, center.cx, center.cy)
			);

		if (star_lines) star(radius - thickness, gon, (origin = center)).forEach((point) => line(point, line_settings));

		if (center_lines)
			centers(radius - thickness, gon, (origin = center)).forEach((point) =>
				line(point, line_settings).rotate(180 / gon, center.cx, center.cy)
			);
	}

	if (inner_glyph) {
		const { radius, glyphs, settings } = inner_glyph;
		text_circle(glyphs.join(" "), radius, settings, (origin = center));
	}

	{
		if (Array.isArray(planets)) {
			circle_points(big_ring.radius, planets.length).forEach((point, i) => {
				rune({ ...planets[i], center: { cx: point.x + center.cx, cy: point.y + center.cy } });
			});
		} else if (typeof planets === "object") {
			const { radius, glyphs, planet_radius, glyph_size } = planets;
			circle_points(radius, glyphs.length).forEach((point, i) => {
				circle(planet_radius, point, (settings = {}), (origin = center));
				glyph(glyphs[i], point, (letterSettings = { size: glyph_size }), (orign = center));
			});
		}
	}

	return drawer;
}

rune({
	center: { cx: 450, cy: 450 },
	ring: {
		radius: 300,
		thickness: 30,
		text: "very long banana words dupa image fill move canvas circle oh my very long banana words dupa image fill move canvas circle oh my very long banana words dupa image fill move canvas circle oh my",
		gon: 8,
		settings: {
			polygon: true,
			second_polygon: true,
			depleted_polygon: false,
			star_lines: false,
			center_lines: true
		},
		line: {
			width: 2
		}
	},
	glyph: {
		radius: 200,
		glyphs: random_runes(24),
		settings: {
			size: 50
		}
	},
	planets: [
		{
			ring: {
				radius: 100,
				thickness: 30,
				text: "very long banana words dupa image fill move canvas circle oh my very long banana words",
				gon: 6,
				settings: {
					polygon: true,
					second_polygon: true,
					depleted_polygon: false,
					star_lines: false,
					center_lines: true
				},
				line: {
					width: 2
				}
			},
			planets: {
				glyphs: random_runes(6),
				radius: 85,
				planet_radius: 25,
				glyph_size: 20
			}
		},
		{
			ring: {
				radius: 100,
				thickness: 30,
				text: "very long banana words dupa image fill move canvas circle oh my very long banana words",
				gon: 6,
				settings: {
					polygon: true,
					second_polygon: true,
					depleted_polygon: false,
					star_lines: false,
					center_lines: true
				},
				line: {
					width: 2
				}
			},
			planets: {
				glyphs: random_runes(6),
				radius: 85,
				planet_radius: 25,
				glyph_size: 20
			}
		},
		{
			ring: {
				radius: 100,
				thickness: 30,
				text: "very long banana words dupa image fill move canvas circle oh my very long banana words",
				gon: 6,
				settings: {
					polygon: true,
					second_polygon: true,
					depleted_polygon: false,
					star_lines: false,
					center_lines: true
				},
				line: {
					width: 2
				}
			},
			planets: {
				glyphs: random_runes(6),
				radius: 85,
				planet_radius: 25,
				glyph_size: 20
			}
		},
		{
			ring: {
				radius: 100,
				thickness: 30,
				text: "very long banana words dupa image fill move canvas circle oh my very long banana words",
				gon: 6,
				settings: {
					polygon: true,
					second_polygon: true,
					depleted_polygon: false,
					star_lines: false,
					center_lines: true
				},
				line: {
					width: 2
				}
			},
			planets: {
				glyphs: random_runes(6),
				radius: 85,
				planet_radius: 25,
				glyph_size: 20
			}
		},
		{
			ring: {
				radius: 100,
				thickness: 30,
				text: "very long banana words dupa image fill move canvas circle oh my very long banana words",
				gon: 6,
				settings: {
					polygon: true,
					second_polygon: true,
					depleted_polygon: false,
					star_lines: false,
					center_lines: true
				},
				line: {
					width: 2
				}
			},
			planets: {
				glyphs: random_runes(6),
				radius: 85,
				planet_radius: 25,
				glyph_size: 20
			}
		}
	]
});
