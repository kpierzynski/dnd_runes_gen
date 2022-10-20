var canvas = SVG().addTo('#drawing').size('100%', '100%');

radius = 223;

function polar2cart( r, angle ) {
	return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function approx_circle( r, point_count ) {
	const step = 2*Math.PI / point_count;
	const result = [];

	for( let i = 0; i < point_count; i++ ) {
		result.push( polar2cart(r, 3*Math.PI/2 + i*step) );
	}

	return result;
}

function generate_circle_path(r) {
	return `M 250,250 m ${-r} 0 a ${r}, ${r} 0 1,0 ${2*r},0 a ${r},${r} 0 1,0 ${-2*r},0`
}

function draw_ngon(r, gon, rotate=0) {
	const ring = approx_circle(r, gon);

	for( let i = 0; i < ring.length-1; i++ ) {
		const {x,y} = ring[i];
		const {x: xn, y: yn} = ring[i+1];
		canvas.line(x+250,y+250,xn+250,yn+250).stroke({width: 1, color: "gray"}).rotate(rotate, 250,250);
	}
	canvas.line(ring[ring.length-1].x+250, ring[ring.length-1].y+250, ring[0].x+250, ring[0].y+250).stroke({width: 1, color: "gray"}).rotate(rotate, 250,250);
}

function deg2rad(deg) {
	//pi = 180
	//x = deg
	return Math.PI*deg/180;
}

function rune( text, gon ) {
	canvas.clear();
	
	draw_ngon(230, gon);
	draw_ngon(230*Math.cos(deg2rad(360/gon/2)), gon, 360/gon/2);
	
	const a = canvas.circle(500).stroke('gray').fill('transparent')
	const b = canvas.circle(500-2*20).stroke('gray').fill('transparent').move(20,20);
	const c = canvas.textPath(`${text}`, generate_circle_path(radius) ).attr("textLength",`${2*radius*Math.PI}`);
}


rune("very long banana words dupa image fill move canvas circle oh my god it is longer wtf ", 6);
