// fullscreen.js

export function toggleFullscreen(videoContainer) {

    var requestFullScreen = videoContainer.requestFullscreen ||
        videoContainer.mozRequestFullScreen ||
        videoContainer.webkitRequestFullScreen ||
        videoContainer.webkitEnterFullScreen ||
        videoContainer.msRequestFullscreen;

    var exitFullScreen = document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;

    // var fullscreenchange = doc.onfullscreenchange || doc.onmozfullscreenchange || docEl.onwebkitfullscreenchange || doc.onmsfullscreenchange;

    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        // Вход в полноэкранный режим, если не находится в нем
        if (requestFullScreen) {
            requestFullScreen.call(videoContainer);
        }
    } else {
        // Выход из полноэкранного режима
        if (exitFullScreen) {
            exitFullScreen.call(document);
        }
    }
}
