import birdsData from "./birds.js";
import { renderAnswers, answersList } from "./components/Answers.js";
import {
    renderInfo, info, renderHint,
    playBtn as infoPlayBtn, playBtnIcon as infoPlayIcon, timeSlider as infoTimeSlider, currentTime as infoCurrentTime, timeDuration as infoTimeDuration,
    volumeBtn as infoVolumeBtn, volumeBtnIcon as infoVolumeIcon, volumeSlider as infoVolumeSlider
} from "./components/Info.js";
import {
    renderQuestion, setQuestion,
    playBtn as questionPlayBtn, playBtnIcon as questionPlayIcon, timeSlider as questionTimeSlider, currentTime as questionCurrentTime, timeDuration as questionTimeDuration,
    volumeBtn as questionVolumeBtn, volumeBtnIcon as questionVolumeIcon, volumeSlider as questionVolumeSlider
} from './components/Question.js';
import { renderButton, button } from './components/Button.js';
import { renderLevels, quizLevels } from './components/Levels.js';
import { renderScore, quizScoreCount } from './components/Score.js';

const questionAudio = new Audio();
const answerAudio = new Audio();
const wrongAnswerAudio = new Audio('../assets/audio/wrong-answer.mp3');
const correctAnswerAudio = new Audio('../assets/audio/correct-answer.mp3');

let level = 0;
let score = 0;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const getRandomBird = (birdsOnLevel) => {
    return birdsOnLevel[Math.floor((Math.random() * birdsOnLevel.length))];
}

const setCurrentLevel = (level) => {
    info.innerHTML = '';
    renderHint();
    quizLevels.childNodes[level].classList.add('levels-list__item_active');

    if (level > 0) {
        quizLevels.childNodes[level - 1].classList.remove('levels-list__item_active');
    }
}

const setScore = () => {
    return quizScoreCount.textContent = score;
}

const renderComponents = (shuffledBirds) => {
    renderLevels();
    renderQuestion();
    renderAnswers(shuffledBirds);
    level === 5 ? renderButton('Завершить попытку') : renderButton('Следующий уровень');
    setScore();
    setQuestion()
    renderScore();
}

const togglePlay = (audio, icon) => {
    if (audio.paused) {
        audio.play();
        icon.src = '../assets/icons/audio_player/pause_ico.svg';
    } else {
        audio.pause();
        icon.src = '../assets/icons/audio_player/play_ico.svg';
    }
}

const getTimeCodeFromNum = (num) => {
    const seconds = parseInt(num % 60);
    const minutes = parseInt(num / 60);

    return `${minutes}:${String(seconds).padStart(2, 0)} `;
}

const showProgress = (rangeInput, slider, currentTime, audio) => {
    slider.style.setProperty('--time-progress-width', rangeInput.currentTime / rangeInput.duration * 100 + '%');
    slider.value = Math.floor(audio.currentTime);
    currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}

const displayAudioDuration = (duration, audio) => {
    duration.textContent = getTimeCodeFromNum(audio.duration);
}

const setSliderMax = (slider, audio) => {
    slider.max = Math.floor(audio.duration);
}

const toggleMute = (audio, icon, slider) => {
    audio.muted = !audio.muted;

    if (audio.muted) {
        icon.src = '../assets/icons/audio_player/mute_ico.svg';
        slider.value = 0;
        slider.style.setProperty('--volume-progress-width', '0%');
    } else {
        icon.src = '../assets/icons/audio_player/volume_ico.svg';
        slider.value = audio.volume * 100;
        slider.style.setProperty('--volume-progress-width', `${audio.volume * 100}%`);
    }
}

const changeVolume = (rangeInput, slider, audio) => {
    const newVolume = rangeInput.value / rangeInput.max;
    audio.volume = newVolume;
    slider.value = newVolume * 100;
    slider.style.setProperty('--volume-progress-width', `${newVolume * 100}%`);
}

const audioListeners = (audio, playBtn, playBtnIcon, timeSlider, currentTime, timeDuration, volumeBtn, volumeBtnIcon, volumeSlider) => {
    playBtn.addEventListener('click', () => togglePlay(audio, playBtnIcon));
    audio.addEventListener('timeupdate', e => showProgress(e.target, timeSlider, currentTime, audio));
    audio.addEventListener('loadedmetadata', () => {
        setSliderMax(timeSlider, audio);
        displayAudioDuration(timeDuration, audio);
    });
    timeSlider.addEventListener('input', () => audio.currentTime = timeSlider.value);
    volumeBtn.addEventListener('click', () => toggleMute(audio, volumeBtnIcon, volumeSlider));
    volumeSlider.addEventListener('input', e => changeVolume(e.target, volumeSlider, audio));
}

audioListeners(questionAudio, questionPlayBtn, questionPlayIcon, questionTimeSlider, questionCurrentTime, questionTimeDuration,
    questionVolumeBtn, questionVolumeIcon, questionVolumeSlider);

audioListeners(answerAudio, infoPlayBtn, infoPlayIcon, infoTimeSlider, infoCurrentTime, infoTimeDuration,
    infoVolumeBtn, infoVolumeIcon, infoVolumeSlider);

const play = () => {
    const shuffledBirds = shuffleArray(birdsData[level]);
    const answer = getRandomBird(shuffledBirds);
    let maxScore = 5;
    let correctAnswer = false;

    questionAudio.src = answer.audio;

    renderComponents(shuffledBirds);
    setCurrentLevel(level);

    [...answersList.children].forEach((option, i) => {
        option.addEventListener('click', () => {
            answerAudio.src = shuffledBirds[i].audio;
            if (answerAudio.muted) answerAudio.muted = !answerAudio.muted;
            infoVolumeSlider.value = 100;
            answerAudio.volume = 1;
            infoVolumeSlider.style.setProperty('--volume-progress-width', '100%');
            renderInfo(shuffledBirds[i].name, shuffledBirds[i].species, shuffledBirds[i].description, shuffledBirds[i].image);
        });

        option.onclick = () => {
            if (checkCurrentAnswer(answer.name, shuffledBirds[i])) {
                score += maxScore;
                option.onclick = null;
            } else {
                --maxScore;
                option.onclick = null;
            }

            setScore();

            if (!correctAnswer) correctAnswer = showIndication(correctAnswer, answer.name, shuffledBirds[i], option.firstChild);
        }
    });
}

play();

const showIndication = (flag, answer, currentAnswer, currentIndicator) => {
    if (currentAnswer.name === answer) {
        button.removeAttribute('disabled');
        setIndicatorColor(currentIndicator, 'indicator_true');
        playAudioIndication(correctAnswerAudio);
        questionAudio.pause();
        questionPlayIcon.src = '../assets/icons/audio_player/play_ico.svg';
        flag = true;
    } else {
        setIndicatorColor(currentIndicator);
        playAudioIndication(wrongAnswerAudio);
    }

    return flag;
}

const checkCurrentAnswer = (answer, currentAnswer) => {
    let isCorrect = false;

    if (currentAnswer.name === answer) {
        setQuestion(currentAnswer.name, currentAnswer.image, currentAnswer.name);
        isCorrect = true;
    }

    return isCorrect;
}

const setIndicatorColor = (indicator, color = 'indicator_false') => {
    return indicator.classList.add(color);
}

const playAudioIndication = (audio) => {
    audio.currentTime = 0;
    audio.volume = 0.4;
    audio.play();
}

button.onclick = () => {
    level++;
    setScore();
    questionAudio.volume = 1;
    if (questionAudio.muted) questionAudio.muted = !questionAudio.muted;
    questionVolumeSlider.value = 100;
    questionVolumeSlider.style.setProperty('--volume-progress-width', '100%');

    if (level === 6) {
        localStorage.setItem('score', score);
        window.location.href = '../pages/result.html';
    } else {
        setCurrentLevel(level);
        play();
    }
}