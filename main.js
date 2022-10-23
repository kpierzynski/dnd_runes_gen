var canvas = SVG().addTo("#drawing").size("100%", "100%");

function rune({}) {
	const drawer = new Drawer(canvas)

	drawer.draw_ring({ radius: 300, thickness: 30 });
	drawer.draw_rounded_text(
		{ radius: 300+30/4, text: "very long intense hard to read and write text to test curving letters based on path hard task to do btw cuz it is very longy text" },
		{ size: 20, weight: "bold" }
	);
	//draw_offseted(drawer, {radius:300-30, vertices:3, steps:1})
	//draw_offseted(drawer, {radius:300-30, vertices:6, steps:8})
	//draw_ring(drawer, {radius:(300+2*30)/2, thickness: 30});
	
	return drawer.drawer;
}

rune({}).dmove(350,350);
