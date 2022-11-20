import { createDomNode } from "../createDomNode.js";

const container = document.querySelector('.quiz__container');
const answersList = createDomNode('ul', 'quiz__answers', 'answers-list');

const generateAnswer = (bird) => {
    const item = createDomNode('li', 'answers-list__item');
    const indicator = createDomNode('span', 'indicator');
    const option = createDomNode('span', 'answers-list__item-text');

    option.textContent = bird;
    item.appendChild(indicator);
    item.appendChild(option);

    return item;
}

const renderAnswers = (birds) => {
    answersList.innerHTML = '';
    container.append(answersList);

    for (let i = 0; i < birds.length; i++) {
        const item = generateAnswer(birds[i].name);
        answersList.appendChild(item);
    }
}

export { renderAnswers, answersList }