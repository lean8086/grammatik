import correct from './corrector.mjs';

const textInput = document.getElementById('textInput');
const accordion = document.getElementById('corrections');
let corrections = {};
function check(text) {
  corrections = {};
  accordion.innerHTML = '';
  text.toLowerCase().trim().split(' ').forEach((w) => {
    const word = w.trim();
    if (!word.length) return;
    const rightWord = correct(word);
    if (word === rightWord) return;
    if (corrections[word]) return;
    corrections[word] = rightWord;
    textInput.innerHTML = textInput.innerHTML.replace(word, `<span>${word}</span>`);
  });
  accordion.insertAdjacentHTML('beforeend', Object.keys(corrections).map(word => `
    <li><s>${word}</s> → <button>${corrections[word]}</button></li>
  `).join(''));
}

let typing = false;
textInput.addEventListener('input', (ev) => {
  if (typing) return;
  typing = true;
  setTimeout(() => {
    typing = false;
    check(ev.target.textContent);
  }, 2000);
});
window.addEventListener('load', () => check(textInput.textContent));