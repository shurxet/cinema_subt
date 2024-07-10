// progress.js

// ������� ��� ���������� ����� ������� ���������������
export function updateProgress(video, progressRange, currentTimeDisplay, durationDisplay, panelContainer, controlsContainer, subtitlesContainer) {
    const updateProgressInternal = () => {
        const currentTime = video.currentTime;
        const duration = video.duration;
        const percent = (currentTime / duration) * 100;

        // �������������� ������� � ������ "������:�������"
        currentTimeDisplay.textContent = `${formatTime(currentTime)}`;
        durationDisplay.textContent = formatTime(duration);

        // ���������� ����� ����� �������
        progressRange.value = percent; // ��������� �������� �������� value
        const leftColor = '#ceba7a'; // ���� ����� ����� �� ������� ���������� #ceba7a, ������� - #861d1d
        const rightColor = '#888'; // ���� ������ �� ������� ����� - '#888'
        progressRange.style.background = `linear-gradient(to right, ${leftColor} ${percent}%, ${rightColor} ${percent}%)`;
    }

    // ���������� ������� ��� ���������� ����� ������� ��� ��������������� �����
    video.addEventListener('timeupdate', updateProgressInternal);

    // ����� ������� ������� ��� ������������� ����� ������� ��� �������� ��������
    updateProgressInternal();

    updateShowControlsPanel(video, panelContainer, controlsContainer, subtitlesContainer)
}


// ������� ��� �������������� ������� � ������:�������
export function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? '0' + seconds : seconds; // ��������� ������� ���� ��� ����������� ������
    return `${minutes}:${seconds}`;
}


export function updateProgressRange(video, progressRange) {
    video.currentTime = video.duration * (progressRange.value / 100);
}


// ������� ��������� � ��������� ������ ����������
export function updateShowControlsPanel(video, panelContainer, controlsContainer, subtitlesContainer) {
    var block = panelContainer; // �������� ������ �� ��� ���� �� ��� ID
    var timeout; // ���������� ��� �������� ID �������

    function hideBlock() {
        block.classList.add('hidden'); // ��������� ����� 'hidden', ������� �������� ����
        // subtitlesContainer.classList.add('hidden');
        subtitlesContainer.style.bottom = 0;
    }

    // ������� ��� ����������� �����
    function showBlock() {
        block.classList.remove('hidden'); // ������� ����� 'hidden', ����� �������� ����
        subtitlesContainer.style.bottom = (controlsContainer.offsetHeight + 0.2) + 'px';
    }

    // ������� ��� ��������� ������� � ������� ������
    function resetTimer() {
        clearTimeout(timeout); // �������� ���������� ������, ���� �� ��� �������
        timeout = setTimeout(hideBlock, 3000); // ��������� ����� ������ �� 3 �������
    }

    // ��������� ���������� ������� �������� ����
    document.addEventListener('mousemove', function() {
        if (!video.paused) {
            showBlock(); // ���������� ���� ������ ���� ����� �� �� �����
            resetTimer(); // ������ ��� ��� �������� ���� ��������� ��� ��������� ������
        } else {
            console.log('mousemove', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }

    });

    // ��������� ���������� ������� ���������� ����������
    document.addEventListener('keydown', function() {
        if (!video.paused) {
            showBlock(); // ���������� ���� ������ ���� ����� �� �� �����
            resetTimer(); // ��������� ������ ����� ��� ���������� ����������
        } else {
            console.log('keydown', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }
    });

    // ��������� ���������� ������� �����
    document.addEventListener('click', function() {
        if (!video.paused) {
            showBlock(); // ���������� ���� ������ ���� ����� �� �� �����
            resetTimer(); // ��������� ������ ����� ��� �����
        }
        else {
            console.log('click', 'video.paused')
            clearTimeout(timeout);
            block.classList.remove('hidden');
        }
    });

    // ��������� ������ ����� ����� �������� ��������, ����� ������ ������������ ������������ ������� �����
    if (!video.paused) {
        timeout = setTimeout(hideBlock, 5000);
    } else {
            clearTimeout(timeout);
            block.classList.remove('hidden');
    }
}
