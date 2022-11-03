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

function random_runes(length) {
	return [...new Array(length)].map(() => Math.round(Math.random() * runes.length)).map((i) => runes[i]);
}

function random_words(length) {
	return [...new Array(length)].map(() => Math.round(Math.random() * words.length)).map((i) => words[i]);
}

function random_normal(a, b) {
	const v = 4;
	let r = 0;
	for (let i = v; i > 0; i--) {
		r += Math.random();
	}
	if (Number.isInteger(a) && Number.isInteger(b)) return ~~((b - a) * (r / v) + a);
	return r / v;
}

export { polar2cart, deg2rad, rad2deg, generate_circle_path, random_runes, random_normal, random_words };

const words = ["rune", "dnd", "glyph", "runes", "dungeon", "dragon", "magic", "spell"];

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
