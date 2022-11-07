import words from "./words";
import glyphs from "./glyphs";

function random_glyphs(length) {
	return [...new Array(length)].map(() => Math.round(Math.random() * glyphs.length)).map((i) => glyphs[i]);
}

function random_words(length) {
	return [...new Array(length)].map(() => Math.round(Math.random() * words.length)).map((i) => words[i]);
}

export { random_glyphs, random_words };
