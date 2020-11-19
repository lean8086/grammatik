import correct from './corrector.mjs';

const textInput = document.getElementById('textInput');
const accordion = document.getElementById('corrections');
const wordsCounter = document.getElementById('words-counter');
const correctionsCounter = document.getElementById('corrections-counter');

let corrections = {};
let timeout;

function checkSpell(text) {
  corrections = {};
  accordion.innerHTML = '';
  textInput.innerHTML = textInput.textContent;
  const words = text.toLowerCase().match(/[a-z]+/g);
  words.forEach((w) => {
    const word = w.trim();
    if (!word.length) return;
    const rightWord = correct(word);
    if (word === rightWord) return;
    if (corrections[word]) return;
    corrections[word] = rightWord;
    accordion.innerHTML += `<li><s>${word}</s> → <button data-wrong="${w}" title="Apply correction">${rightWord}</button></li>`;
    textInput.innerHTML = textInput.innerHTML.replace(w, `<span>${w}</span>`);
  });
  wordsCounter.textContent = words.length;
  correctionsCounter.textContent = Object.keys(corrections).length;
}

textInput.addEventListener('input', (ev) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => checkSpell(ev.target.textContent), 2000);
});

accordion.addEventListener('click', (ev) => {
  const { tagName, dataset, textContent } = ev.target;
  if (tagName !== 'BUTTON') return;
  textInput.innerHTML = textInput.innerHTML.replace(`<span>${dataset.wrong}</span>`, textContent);
  accordion.querySelector(`[data-wrong="${dataset.wrong}"]`).parentElement.remove();
  delete corrections[dataset.wrong];
  correctionsCounter.textContent = Object.keys(corrections).length;
});

window.addEventListener('load', () => checkSpell(textInput.textContent));