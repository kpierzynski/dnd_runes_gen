var canvas = SVG().addTo("#drawing").size("100%", "100%");

function rune({}) {
	const drawer = canvas.group();

	draw_ring(drawer, { radius: 300, thickness: 30 });
	const a = draw_rounded_text(
		drawer,
		{ radius: 300 + 7.5, text: "dupa i kamieni kupka banan kalafonia zegar alarm linijka monitor gazeta" },
		{ size: 20, weight: "bold" }
	);

	return drawer;
}

rune({}).dmove(350, 350);
