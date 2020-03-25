import getBlobDuration from "get-blob-duration";
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScrBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
      method: "POST"
    });
  };

function handlePlayClick() {
    if(videoPlayer.paused){
        videoPlayer.play();
        // registerView();
        playBtn.innerHTML= '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML= '<i class="fas fa-play"></i>';
    }
};
function handleVolumeClick() {
    if(videoPlayer.muted) {
        videoPlayer.muted =false;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        console.log("unmuted:",videoPlayer.value);
        volumeRange.value = videoPlayer.value;
    } else {
        console.log(videoPlayer.value);
        volumeRange.value = 0;
        console.log("muted:", videoPlayer.value);
        videoPlayer.muted = true;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
};

function exitFullScreen() {
    fullScrBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrBtn.addEventListener("click", goFullScreen);
    if(document.exitFullscreen){
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
};

function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullscreen) {
        videoContainer.mozRequestFullscreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScrBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrBtn.removeEventListener("click", goFullScreen);
    fullScrBtn.addEventListener("click", exitFullScreen);
};

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber/3600);
    let minutes = Math.floor((secondsNumber - hours*3600)/60);
    let totalSeconds = secondsNumber - hours*3600 - minutes*60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
};
function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};
async function setTotalTime() {
    console.log(videoPlayer.duration);
    // blob을 임시다운받아서 get-blob-Duration 함수에 넣어주는 방법
    const blob = await fetch(videoPlayer.src).then(response => response.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
};
function handleEnded() {
    registerView();
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

function handleDrag(event) {
    console.log(event.target.value);
    const{
        target : {value}
    } = event;
    videoPlayer.volume = value;
    if(value >=0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if(value>=0.2) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
};
function init() {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScrBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended", handleEnded);
    volumeRange.addEventListener("input", handleDrag);
};

if(videoContainer) {
    init();
}