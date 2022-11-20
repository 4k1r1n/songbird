import { createDomNode } from "../createDomNode.js";

const content = document.querySelector('.quiz__content');
const question = createDomNode('div', 'quiz__question', 'question', 'layout-2-column');
const questionImg = createDomNode('img', 'question__img');
const questionContainer = createDomNode('div', 'question__container');
const questionAnswer = createDomNode('span', 'question__answer');

const playBtn = createDomNode('button', 'audio-player__button');
const playBtnIcon = createDomNode('img', 'ico', 'ico_play');
const timeline = createDomNode('div', 'audio-player__timeline');
const timeSlider = createDomNode('input', 'audio-player__time-slider');
const timeContainer = createDomNode('div', 'audio-player__timer');
const currentTime = createDomNode('span', 'audio-player__current-time');
const timeDuration = createDomNode('span', 'audio-player__duration');

const volumeContainer = createDomNode('div', 'audio-player__volume');
const volumeSlider = createDomNode('input', 'audio-player__volume-slider');
const volumeBtn = createDomNode('button', 'audio-player__button');
const volumeBtnIcon = createDomNode('img', 'ico', 'ico_volume');
const playerQuestionContainer = createDomNode('div', 'audio-player');

const renderAudioPlayer = () => {
    timeSlider.setAttribute('type', 'range');
    timeSlider.setAttribute('max', 100);
    timeSlider.setAttribute('value', 0);
    playBtnIcon.setAttribute('src', '../assets/icons/audio_player/play_ico.svg');

    volumeSlider.setAttribute('type', 'range');
    volumeSlider.setAttribute('max', 100);
    volumeSlider.setAttribute('value', 100);
    volumeBtnIcon.setAttribute('src', '../assets/icons/audio_player/volume_ico.svg');

    timeDuration.textContent = '0:00';
    currentTime.textContent = '0:00';

    questionContainer.appendChild(playerQuestionContainer);
    playerQuestionContainer.append(playBtn, timeline);
    playBtn.appendChild(playBtnIcon);
    timeline.appendChild(timeSlider);
    timeline.append(timeContainer);
    timeContainer.appendChild(currentTime);
    timeContainer.appendChild(timeDuration);

    playerQuestionContainer.append(volumeContainer);
    volumeContainer.appendChild(volumeBtn);
    volumeContainer.appendChild(volumeSlider);
    volumeBtn.appendChild(volumeBtnIcon);
}

const setQuestion = (alt = 'Unknown bird', src = '../assets/images/quiz_question/bird.jpg', text = '***') => {
    questionImg.setAttribute('alt', alt);
    fetch(src).then((response) => questionImg.src = response.url);
    questionAnswer.textContent = text;
}

const renderQuestion = () => {
    content.before(question);
    question.appendChild(questionImg);
    question.appendChild(questionContainer);
    questionContainer.appendChild(questionAnswer);
    renderAudioPlayer();
}

export { renderQuestion, setQuestion, content, playBtn, playBtnIcon, timeSlider, currentTime, timeDuration, volumeBtn, volumeBtnIcon, volumeSlider };