function polar2cart(r, angle) {
	return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
}

function deg2rad(deg) {
	return (Math.PI * deg) / 180;
}

function generate_circle_path(r, origin = { cx: 0, cy: 0 }) {
	const { cx: x, cy: y } = origin;
	return `M ${x},${y} m ${-r} 0 a ${r}, ${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 ${-2 * r},0`;
}
