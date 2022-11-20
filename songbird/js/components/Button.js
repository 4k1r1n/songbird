import { createDomNode } from "../createDomNode.js";
import { content } from './Question.js';

const buttonContainer = createDomNode('div', 'quiz__buttons');
const button = createDomNode('button', 'btn');

const renderButton = (text) => {
    button.textContent = text;
    content.appendChild(buttonContainer);
    buttonContainer.appendChild(button);
    button.setAttribute('disabled', '');
}

export { renderButton, button };