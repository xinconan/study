const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const sliders = player.querySelectorAll('.player__slider');
const skips = player.querySelectorAll('[data-skip]');

let mousedown = false;

// toggle paly
function togglePlay() {
  if(mousedown) return;
  const status = video.paused ? 'play' : 'pause';
  video[status]();
}

function updateBotton(){
  const txt = this.paused ? '▶' : '▌▌';
  toggle.textContent = txt;
}

function handleChange(e){
  video[this.name] = this.value;
  // video.play();
}

function handleProgress(){
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
}

function handleBar(e) {
  e.stopPropagation();
  const precent = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = precent;
  video.play();
}

function skip(e){
  video.currentTime += parseInt(this.dataset.skip);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBotton);
video.addEventListener('pause', updateBotton);
video.addEventListener('timeupdate', handleProgress);

sliders.forEach(slider=> slider.addEventListener('change', handleChange));
sliders.forEach(slider=> slider.addEventListener('mousemove', handleChange));
// sliders.forEach(slider=> slider.addEventListener('mousedown', ()=> mousedown = true));
// sliders.forEach(slider=> slider.addEventListener('mouseup', ()=> mousedown = false));

skips.forEach(skipBtn => skipBtn.addEventListener('click', skip))

progress.addEventListener('click', handleBar);
progress.addEventListener('mousemove', (e)=>mousedown && handleBar(e));
progress.addEventListener('mousedown', ()=>mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);
