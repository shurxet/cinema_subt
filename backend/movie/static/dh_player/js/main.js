// main.js


import {loadVideo, pauseVideo, playVideo} from './video.js';
import {updateProgress, updateProgressRange} from './progress.js';
import {toggleFullscreen} from './fullscreen.js';
import {showSubtitles, toggleSubtitlesMenu} from './subtitles.js';
import {adjustVideoSize} from './video.js';


// получение элементов видео
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.createElement('video');
video.playsInline = true;


const videoContainer = document.querySelector('.video-container');


const panelContainer = document.querySelector('.panel-container');
const panelContainerBlock = document.getElementById('panelContainer')


const controlsContainer = document.querySelector('.controls-container');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
// const volumeRange = document.getElementById('volumeRange');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const progressRange = document.getElementById('progressRange');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

const messageBtn = document.getElementById('messageBtn');
const chatContainer = document.getElementById('chat-container');

const subtitlesBtn = document.getElementById('subtitlesBtn');
const subtitlesMenuContainer = document.getElementById('subtitlesMenuContainer');
const subtitlesMenu = document.getElementById('subtitlesMenu');
const subtitlesContainer = document.querySelector('.subtitles-container');

const responseData = document.getElementById('responseData').getAttribute('data-response');
let jsonObject = Function('return ' + responseData)();
console.log('jsonObject', jsonObject.subt)


canvas.addEventListener('click', function () {
    if (video.paused) {
        video.play();
        playBtn.style.display = 'none'
        pauseBtn.style.display = 'initial'
    } else {
        video.pause()
        pauseBtn.style.display = 'none'
        playBtn.style.display = 'initial'
    }
})


// Вызываем функцию для получения данных
// getSubtitles(jsonObject.id)



if (jsonObject) {
    const basePath = '../../../../media_cinema/videos/'
    const videoPath = jsonObject.video_path
    loadVideo(canvas, context, video, basePath, videoPath);
}




updateProgress(
    video,
    progressRange,
    currentTimeDisplay,
    durationDisplay,
    panelContainer,
    controlsContainer,
    subtitlesContainer
);




durationDisplay.textContent = '0:00' // ������������� �� ��������� ����������������� �����
progressRange.value = 0 // ������������� �� ��������� ��������� �������
// ���������� ������� ��������� ��������� �������
progressRange.addEventListener('input', () => updateProgressRange(video, progressRange));




playBtn.addEventListener('click', () => playVideo(video, playBtn, pauseBtn));
pauseBtn.addEventListener('click', () => pauseVideo(video, playBtn, pauseBtn));
// volumeRange.addEventListener('input', () => adjustVolume(video, volumeRange));
fullscreenBtn.addEventListener('click', () => toggleFullscreen(videoContainer));
subtitlesBtn.addEventListener('click', () => toggleSubtitlesMenu(
    subtitlesMenuContainer, subtitlesMenu, jsonObject.subt, controlsContainer
));




//messageBtn
messageBtn.addEventListener('click', () => {
    chatContainer.classList.toggle('show-chat');
    console.log('messageBtn')
})




// ��������
// ������������� ������ ���� ����� subtitles �� ���������� ��������� ����� controls
subtitlesContainer.style.bottom = (controlsContainer.offsetHeight + 0.2) + 'px';
// ��������� ���������� ��������� ��� �����
video.addEventListener('timeupdate', () => showSubtitles(
    video, jsonObject.subt, subtitlesContainer
));
