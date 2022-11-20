import { createDomNode } from "../createDomNode.js";

const info = document.querySelector('.quiz__info');
const hint = createDomNode('h2', 'info__hint');
const infoContainer = createDomNode('div', 'info__container');
const infoWrapper = createDomNode('div', 'info__text-wrapper');
const infoHeading = createDomNode('div', 'info__heading');
const infoTitle = createDomNode('h3', 'info__title');
const infoSubtitle = createDomNode('p', 'info__subtitle');
const infoText = createDomNode('p', 'info__text');
const infoImg = createDomNode('img', 'info__img');
const playerInfoContainer = createDomNode('div', 'info__audio-player', 'audio-player');

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

const renderHint = () => {
    hint.innerHTML = '<span>Прослушайте</span> аудио-трек и <span>выберите</span> птицу из списка';
    info.appendChild(hint);
}

const renderAudioPlayer = () => {
    timeSlider.setAttribute('type', 'range');
    timeSlider.setAttribute('max', 100);
    timeSlider.setAttribute('value', 0);
    playBtnIcon.setAttribute('src', '../assets/icons/audio_player/play_ico.svg');

    volumeSlider.setAttribute('type', 'range');
    volumeSlider.setAttribute('max', 100);
    volumeSlider.setAttribute('value', 75);
    volumeBtnIcon.setAttribute('src', '../assets/icons/audio_player/volume_ico.svg');

    timeDuration.textContent = '0:00';
    currentTime.textContent = '0:00';

    info.appendChild(playerInfoContainer);
    playerInfoContainer.append(playBtn, timeline);
    playBtn.appendChild(playBtnIcon);
    timeline.appendChild(timeSlider);
    timeline.append(timeContainer);
    timeContainer.appendChild(currentTime);
    timeContainer.appendChild(timeDuration);

    playerInfoContainer.append(volumeContainer);
    volumeContainer.appendChild(volumeBtn);
    volumeContainer.appendChild(volumeSlider);
    volumeBtn.appendChild(volumeBtnIcon);
}

const renderInfo = (name, species, description, image) => {
    hint.innerHTML = '';
    infoTitle.textContent = name;
    infoSubtitle.textContent = species;
    infoText.textContent = description;
    infoImg.setAttribute('alt', name);

    fetch(image).then((response) => infoImg.src = response.url);

    info.appendChild(infoContainer);
    infoContainer.appendChild(infoWrapper);
    infoWrapper.appendChild(infoHeading);
    infoHeading.appendChild(infoTitle);
    infoHeading.appendChild(infoSubtitle);
    infoWrapper.appendChild(infoText);
    infoContainer.append(infoImg);

    renderAudioPlayer();
}

export { renderInfo, renderHint, infoTitle, info, playBtn, playBtnIcon, timeSlider, currentTime, timeDuration, volumeBtn, volumeBtnIcon, volumeSlider }