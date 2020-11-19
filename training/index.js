const fs = require('fs');
const nWords = {};

// NOTE: Multiple invocations of this fn can extend the training of the model
function train(text) {
	let m;
	const regex = /[a-z]+/g;
	const input = text.toLowerCase();
	while ((m = regex.exec(input))) {
		const word = m[0];
		nWords[word] = nWords[word] ? nWords[word] + 1 : 1;
	}
}

// Train
fs.readFile('./big.txt', 'utf8', (_err, data) => {
  data.split('\n').forEach(train);
  fs.writeFile('trained.json', JSON.stringify(nWords), () => console.log('DONE'));
});

