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
