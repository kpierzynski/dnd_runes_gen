var canvas = SVG().addTo("#drawing").size("100%", "100%");

function rune({}) {
	const drawer = canvas.group();

	draw_ring(drawer, { radius: 300, thickness: 30 });
	draw_rounded_text(
		drawer,
		{ radius: 300 + 7.5, text: "dupa i kamieni kupka banan kalafonia zegar alarm linijka monitor gazeta" },
		{ size: 20, weight: "bold" }
	);
	//draw_shape(drawer, {radius: 300-30, vertices: 8});
	draw_shape(drawer, {radius: 300-30, vertices: 8}).rotate(180/8, 0, 0 );
	//draw_shape(drawer, {radius: 300-30, vertices: 4});
	//draw_shape(drawer, {radius: 300-30, vertices: 4}).rotate(180/4,0,0);

	let r = 300-30;
	r = r * Math.cos(deg2rad(180/8));
	draw_shape(drawer, {radius:r, vertices: 8}).rotate(0, 0, 0 );
	
	r = r * Math.cos(deg2rad(180/8));
	draw_shape(drawer, {radius: r, vertices: 8}).rotate(180/8, 0, 0 );
	
	r = r * Math.cos(deg2rad(180/8));
	draw_shape(drawer, {radius: r, vertices: 8}).rotate(2*180/8, 0, 0 );
	
	return drawer;
}

rune({}).dmove(350, 350);
