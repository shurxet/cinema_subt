// subtitles.js


export let subtitlesData = {}; // ���������� ���������� ��� �������� ������

export async function getSubtitles(series_id) {
    const response = await fetch(`subtitles/${series_id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',}
    });

    // ���������, ��� �� ������� �������� ����� (������ 200-299)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // ����������� ����� � JSON
    const data = await response.json();

    // ��������� ������ � ���������� ����������
    subtitlesData = data;

    // ��������� ������
    console.log('fetchData', data);
}


let isInputCheckbox = false;

export function loadSubtitlesLabel(subtitlesMenu, subtitlesData) {
    if (!isInputCheckbox) {
        for (const key in subtitlesData) {

            const contLaCh = document.createElement('div');
            contLaCh.classList.add('contLaCh');
            const label = document.createElement('label');
            if (key === "Ru") {
                label.style.color = "#ceba7a"
            }
            label.textContent = key
            const inputCheckbox = document.createElement('input');
            inputCheckbox.setAttribute('type', 'checkbox');
            inputCheckbox.setAttribute('lang', key);
            inputCheckbox.id = key;

            label.appendChild(inputCheckbox);
            contLaCh.appendChild(label);
            subtitlesMenu.appendChild(contLaCh);

            console.log('subtitlesData Key', key); // ������� ���� �������
        }
        isInputCheckbox = true;
    }
}


// ������� ��� ����������� ���� ���������
export function toggleSubtitlesMenu(subtitlesMenuContainer, subtitlesMenu, subtitlesData, controlsContainer) {
    setSubtitlesMenuPosition(subtitlesMenuContainer, controlsContainer);
    loadSubtitlesLabel(subtitlesMenu, subtitlesData)
    subtitlesMenuContainer.classList.toggle('active');
}


// ������� ��� ��������� ��������� ���� ���������
export function setSubtitlesMenuPosition(subtitlesMenuContainer, controlsContainer) {
    const controlsContainerHeight = controlsContainer.offsetHeight;
    // ������������� ������� ���������� ����� subtitles-menu-container
    subtitlesMenuContainer.style.bottom = controlsContainerHeight + 'px';
}


// �������������� �������� ������� ����������� � ������ "HH:mm:ss,SSS"
export function secondsToTimeString(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = Math.floor((remainingSeconds - Math.floor(remainingSeconds)) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(Math.floor(remainingSeconds)).padStart(2, '0')},${String(milliseconds).padStart(3, '0')}`;
}


// ������� ��� ����������� ���������
export function showSubtitles(video,  subtitlesData, subtitlesContainer) {
    const currentTime = video.currentTime;
    // �������������� �������� ������� � ������ ������� ��������
    const currentTimeString = secondsToTimeString(currentTime)

    while (subtitlesContainer.firstChild) {
        subtitlesContainer.removeChild(subtitlesContainer.firstChild);
    }

    for (const subt in subtitlesData) {
        const itemSubtitleToShow = subtitlesData[subt].find(subtitle => currentTimeString >= subtitle.start && currentTimeString <= subtitle.end);
        if (itemSubtitleToShow && itemSubtitleToShow.text) {
            const checkBox = document.getElementById(subt);
            if (checkBox && checkBox.checked) {
                const subtitlesBlock = document.createElement('div');
                if (subt === "Ru") {
                    subtitlesBlock.style.color = "#ceba7a";
                }
                if (itemSubtitleToShow.text) {
                    subtitlesBlock.innerHTML = itemSubtitleToShow.text;
                }
                subtitlesBlock.classList.add('subtitles');
                subtitlesBlock.setAttribute('lang', subt);
                subtitlesContainer.appendChild(subtitlesBlock);
            }
        }
    }
}
