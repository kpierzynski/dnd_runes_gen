function polar2cart(r, angle) {
	return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function deg2rad(deg) {
	return (Math.PI * deg) / 180;
}

function rad2deg(rad) {
	return (180 * rad) / Math.PI;
}

function generate_circle_path(r) {
	return `m ${-r} 0 a ${r}, ${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 ${-2 * r},0`;
}

export { polar2cart, deg2rad, rad2deg, generate_circle_path };
