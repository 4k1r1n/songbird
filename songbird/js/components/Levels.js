import { createDomNode } from "../createDomNode.js";

const quizWrapper = document.querySelector('.quiz__wrapper');
const quizLevels = createDomNode('ul', 'quiz__levels', 'levels-list');

const levels = ['Разминка', 'Воробьиные', 'Лесные', 'Певчие', 'Хищные', 'Морские']

const renderLevels = () => {
    quizLevels.innerHTML = '';
    quizWrapper.prepend(quizLevels);

    for (let i = 0; i < 6; i++) {
        const quizLevel = createDomNode('li', 'levels-list__item');
        quizLevel.textContent = levels[i];
        quizLevels.appendChild(quizLevel);
    }
}

export { renderLevels, quizLevels };