import Drawer from "./shapes";

function Rune(canvas, colors, { ring, glyph, lines, settings }) {
	const drawer = new Drawer(canvas, colors);

	drawer.clear();

	drawer.draw_ring({ radius: ring.radius, thickness: ring.thickness, transparent: ring.transparent_center });

	drawer.draw_rounded_text(
		{
			radius: ring.radius,
			thickness: ring.thickness,
			text: ring.text
		},
		{ size: ring.text_size }
	);

	if (lines.center_lines)
		drawer.draw_center({ radius: ring.radius - ring.thickness, vertices: lines.center_lines_count });

	if (lines)
		lines.lines.forEach(({ vertices, steps }) => {
			drawer.draw_offseted({
				radius: ring.radius - ring.thickness,
				vertices: vertices,
				steps: steps
			});
		});

	if (lines.star) drawer.draw_star({ radius: ring.radius - ring.thickness, vertices: lines.star_arm_count });

	if (glyph)
		drawer.draw_glyphs({
			radius: glyph.radius + 1,
			glyphs: glyph.glyphs,
			size: glyph.size,
			border: { border: glyph.border, radius: glyph.border_radius }
		});

	return drawer;
}

export default Rune;
