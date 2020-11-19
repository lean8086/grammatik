import nWords from './trained.mjs';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function correct(word) {
	if (nWords[word]) return word;
	const candidates = {};
	const list = edits(word);
	list.forEach((edit) => {
		if (nWords[edit]) candidates[nWords[edit]] = edit;
	});
	if (Object.keys(candidates).length) return candidates[max(candidates)];
	list.forEach(edit => {
		edits(edit).forEach((w) => {
			if (nWords[w]) candidates[nWords[w]] = w;
		});
	});
	return Object.keys(candidates).length ? candidates[max(candidates)] : word;
}

// Find the word with the most occurences in the language
function max(candidates) {
	const arr = [];
	for (const candidate in candidates) {
		if (candidates[candidate]) arr.push(candidate);
	}
	return Math.max.apply(null, arr);
};

// Possible corrections of the specified word.
function edits(word) {
	let i;
	const j = word.length;
	const results = [];
	// Deletion
	for (i = 0; i < j; i += 1) {
		results.push(word.slice(0, i) + word.slice(i + 1));
	}
	// Transposition
	for (i = 0; i < j - 1; i += 1) {
		results.push(word.slice(0, i) + word.slice(i + 1, i + 2) + word.slice(i, i + 1) + word.slice(i + 2));
	}
	// Alteration
	for (i = 0; i < j; i += 1) {
		letters.forEach((l) => {
			results.push(word.slice(0, i) + l + word.slice(i + 1));
		});
	}
	// Insertion
	for (i = 0; i <= j; i += 1) {
		letters.forEach((l) => {
			results.push(word.slice(0, i) + l + word.slice(i));
		});
	}
	return results;
};