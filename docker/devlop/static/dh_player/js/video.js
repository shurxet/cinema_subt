// video.js

export function loadVideo(canvas, context, video, basePath, videoPath) {

    console.log('HLSjs Supported', Hls.isSupported());
    if (dashjs.supportsMediaSource && typeof ( window.MediaSource || window.WebKitMediaSource ) === "function") {
        const player = dashjs.MediaPlayer().create();
        player.initialize(video, basePath + videoPath.dash_path, false);
        player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function () {
            console.log('DASHjs Supported');
        });
    }
    else if (Hls.isSupported()) {
        console.log('HLSjs Supported', Hls.isSupported());
        const hls = new Hls();
        hls.loadSource(basePath + videoPath.hls_path);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            console.log('HLSjs Supported');
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = basePath + videoPath.hls_path;
        console.log('HLS Supported');
    }


    video.addEventListener('loadeddata', function () {
        console.log('video.videoWidth', video.videoWidth, 'video.videoHeight', video.videoHeight);
        canvas.width =  video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    });

    video.addEventListener('play', () => drawVideo(canvas, context, video));
    video.addEventListener('pause', () => cancelAnimationFrame(() => {
        drawVideo(canvas, context, video)
    }));
}




export function drawVideo(canvas, context, video) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => drawVideo(canvas, context, video)); //                                             
}


//                                          
export function playVideo(video, playBtn, pauseBtn) {
    if (video.readyState >= 2) {
        if (video.paused) {
            video.play();
            playBtn.style.display = 'none'
            pauseBtn.style.display = 'initial'
        }
    }
}


export function pauseVideo(video, playBtn, pauseBtn) {
    if (video.readyState >= 2) {
        if (video.paused) {
            video.play();
            pauseBtn.style.display = 'none'
        } else {
            video.pause();
            pauseBtn.style.display = 'none'
            playBtn.style.display = 'initial'
        }
    }
}


export function adjustVideoSize(canvas, context, video) {
    video.width = window.innerWidth;
    video.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}
