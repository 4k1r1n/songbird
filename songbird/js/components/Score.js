import { createDomNode } from "../createDomNode.js";
import { content } from './Question.js';

const quizScore = createDomNode('div', 'quiz__score');
const quizScoreCount = createDomNode('span', 'quiz__score-count');

const renderScore = () => {
    quizScore.textContent = 'Счёт: ';
    content.prepend(quizScore);
    quizScore.appendChild(quizScoreCount);
}

export { renderScore, quizScoreCount };