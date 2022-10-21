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

function rune(center, outer_ring, mini_rings) {
	const drawer = canvas.group();

	function text_circle(text, radius, fontSettings = {}) {
		return drawer
			.textPath(`${text}`, generate_circle_path(radius, (origin = center)))
			.font(fontSettings)
			.attr("textLength", `${2 * radius * Math.PI}`);
	}

	function ring_border(radius, origin = { cx: 0, cy: 0 }) {
		return drawer
			.circle(2 * radius)
			.stroke({ width: 3, color: "black" })
			.fill("transparent")
			.move(origin.cx - radius, origin.cy - radius);
	}

	function ring(text, radius, th, origin = { cx: 0, cy: 0 }) {
		const white_ring = drawer
			.circle(2 * radius - th)
			.stroke({ width: th, color: "white" })
			.fill("transparent")
			.move(th, th)
			.move(origin.cx - (radius - th / 2), origin.cy - (radius - th / 2));

		ring_border(radius, origin);
		ring_border(radius - th, origin);

		text_circle(text, radius, { weight: "bold" });
	}

	function line(point) {
		return drawer.line(point.x1, point.y1, point.x2, point.y2).stroke({ width: 3, color: "black" });
	}

	function glyph(letter, point, letterSettings = {}, origin = { cx: 0, cy: 0 }) {
		const text = drawer.text(letter.at(0)).font(letterSettings);
		const { width, height } = text.node.getBBox();
		text.move(point.x + center.cx - width / 2, point.y + center.cy - height / 2);
	}

	function circle(radius, point, origin = { cx: 0, cy: 0 }) {
		return drawer
			.circle(radius * 2)
			.move(point.x + origin.cx - radius, point.y + origin.cy - radius)
			.fill("white")
			.stroke({ width: 3, color: "black" });
	}

	{
		const { radius, thickness, text, glyph_radius, glyphs, gon } = outer_ring;
		ring(text, radius, thickness, (origin = center));

		ngon(radius - thickness, gon, (origin = center)).forEach((point) =>
			line(point).rotate(180 / gon, center.cx, center.cy)
		);
		ngon(radius - thickness, gon, (origin = center)).forEach((point) =>
			line(point).rotate(0, center.cx, center.cy)
		);
		ngon(radius - thickness, gon / 2, (origin = center)).forEach((point) =>
			line(point).rotate(360 / gon, center.cx, center.cy)
		);

		//star(radius - thickness, gon, (origin = center)).forEach((point) => line(point));

		centers(radius - thickness, gon, (origin = center)).forEach((point) =>
			line(point).rotate(180 / gon, center.cx, center.cy)
		);

		text_circle(glyphs.join(" "), glyph_radius, { size: 50, weight: "bold" });

		if (!mini_rings) return;

		if (Array.isArray(mini_rings)) {
			circle_points(radius - thickness / 2, mini_rings.length, (origin = center)).forEach((point, i) => {
				//rune({ cx: point.x + center.cx, cy: point.y + center.cy }, mini_rings[i]);
				mini_rings[i].dmove(point.x, point.y);
			});
		} else if (typeof mini_rings === "object") {
			circle_points(radius - thickness / 2, gon, (origin = center)).forEach((point) => {
				circle(30, point, (origin = center));
				glyph("A", point, { size: 30 }, (orign = origin));
			});
		}
	}
	return drawer;
}

a = rune(
	{ cx: 350, cy: 350 },
	{
		radius: 140,
		thickness: 30,
		text: "chuj dupa i kamieni kupa",
		glyph_radius: 100,
		glyphs: random_runes(8),
		gon: 6
	},
	{}
);

rune(
	{ cx: 350, cy: 350 },
	{
		radius: 300,
		thickness: 30,
		text: "very long banana words dupa image fill move canvas circle oh my",
		glyph_radius: 260,
		glyphs: random_runes(24),
		gon: 8
	},
	[a]
);
