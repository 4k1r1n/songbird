import { createDomNode } from "./createDomNode.js";

const score = localStorage.getItem('score');
const resultTitle = document.querySelector('.result__title');
const resultSubtitle = createDomNode('h3', 'result__subtitle');

resultSubtitle.textContent = `Вы прошли викторину и набрали ${score} из 30 возможных баллов`;

resultTitle.after(resultSubtitle);
