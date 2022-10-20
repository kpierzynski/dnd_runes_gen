var canvas = SVG().addTo('#drawing').size('100%', '100%');

radius = 223;
text = "very long banana words dupa image fill move canvas circle oh my god it is longer wtf ";

function polar2cart( r, angle ) {
	return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function approx_circle( r, point_count ) {
	const step = 2*Math.PI / point_count;
	const result = [];

	for( let i = 0; i < point_count; i++ ) {
		result.push( polar2cart(r, i*step) );
	}

	return result;
}

const count = 3;
const ring = approx_circle(230, count);

for( let i = 0; i < ring.length-1; i++ ) {
	const {x,y} = ring[i];
	const {x: xn, y: yn} = ring[i+1];
	canvas.line(x+250,y+250,xn+250,yn+250).stroke({width: 1, color: "gray"});
}
canvas.line(ring[count-1].x+250, ring[count-1].y+250, ring[0].x+250, ring[0].y+250).stroke({width: 1, color: "gray"})

const a = canvas.circle(500).stroke('gray').fill('transparent')
const b = canvas.circle(500-2*20).stroke('gray').fill('transparent').move(20,20);
const c = canvas.textPath(`${text} `, `M 250,250 m ${-radius} 0 a ${radius}, ${radius} 0 1,0 ${2*radius},0 a ${radius},${radius} 0 1,0 ${-2*radius},0`);

c.attr("textLength",`${2*radius*Math.PI}`);
