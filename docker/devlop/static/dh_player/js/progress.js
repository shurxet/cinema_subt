// progress.js

// Функция для обновления шкалы времени воспроизведения
export function updateProgress(video, progressRange, currentTimeDisplay, durationDisplay, panelContainer, controlsContainer, subtitlesContainer) {
    const updateProgressInternal = () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const percent = (currentTime / duration) * 100;

        // Форматирование времени в формат "минуты:секунды"
        currentTimeDisplay.textContent = `${formatTime(currentTime)}`;
        durationDisplay.textContent = formatTime(duration);

        // Обновление цвета школы времени
        progressRange.value = percent; // обновляем значение атрибута value
        const leftColor = '#ceba7a'; // Цвет шкалы слева от бегунка золотистый #ceba7a, красный - #861d1d
        const rightColor = '#888'; // Цвет справа от бегунка серый - '#888'
        progressRange.style.background = `linear-gradient(to right, ${leftColor} ${percent}%, ${rightColor} ${percent}%)`;
    }

    // Обработчик события для обновления шкалы времени при воспроизведении видео
    video.addEventListener('timeupdate', updateProgressInternal);

    // Вызов функции вручную для инициализации шкалы времени при загрузке страницы
    updateProgressInternal();

    updateShowControlsPanel(video, panelContainer, controlsContainer, subtitlesContainer)
}


// Функция для форматирования времени в минуты:секунды
export function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds; // Добавляем ведущий ноль для однозначных секунд
    return `${minutes}:${seconds}`;
}


export function updateProgressRange(video, progressRange) {
    video.currentTime = video.duration * (progressRange.value / 100);
}


// Функция появления и исчезания панели управления
export function updateShowControlsPanel(video, panelContainer, controlsContainer, subtitlesContainer) {
    var block = panelContainer; // Получаем ссылку на ваш блок по его ID
    var timeout; // Переменная для хранения ID таймера

    function hideBlock() {
        block.classList.add('hidden'); // Добавляем класс 'hidden', который скрывает блок
        // subtitlesContainer.classList.add('hidden');
        subtitlesContainer.style.bottom = 0;
    }

    // Функция для отображения блока
    function showBlock() {
        block.classList.remove('hidden'); // Удаляем класс 'hidden', чтобы показать блок
        subtitlesContainer.style.bottom = (controlsContainer.offsetHeight + 0.2) + 'px';
    }

    // Функция для обнуления таймера и запуска нового
    function resetTimer() {
        clearTimeout(timeout); // Обнуляем предыдущий таймер, если он был запущен
        timeout = setTimeout(hideBlock, 3000); // Запускаем новый таймер на 3 секунды
    }

    // Добавляем обработчик события движения мыши
    document.addEventListener('mousemove', function() {
        if (!video.paused) {
            showBlock(); // Показываем блок только если видео не на паузе
            resetTimer(); // Каждый раз при движении мыши запускаем или обновляем таймер
        } else {
            console.log('mousemove', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }

    });

    // Добавляем обработчик события активности клавиатуры
    document.addEventListener('keydown', function() {
        if (!video.paused) {
            showBlock(); // Показываем блок только если видео не на паузе
            resetTimer(); // Запускаем таймер снова при активности клавиатуры
        } else {
            console.log('keydown', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }
    });

    // Добавляем обработчик события клика
    document.addEventListener('click', function() {
        if (!video.paused) {
            showBlock(); // Показываем блок только если видео не на паузе
            resetTimer(); // Запускаем таймер снова при клике
        }
        else {
            console.log('click', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }
    });

    // Запускаем таймер сразу после загрузки страницы, чтобы начать отслеживание неактивности курсора сразу
    if (!video.paused) {
        timeout = setTimeout(hideBlock, 5000);
    } else {
            clearTimeout(timeout);
            block.classList.remove('hidden');
    }
}
