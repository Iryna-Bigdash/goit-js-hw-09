const CHANGE_COLOR_DELAY = 1000;
let timeIntervalId = null;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick(e) {
  timeIntervalId = setInterval(() => {
    refs.bodyEl.style.background = getRandomHexColor();
  }, CHANGE_COLOR_DELAY);

  if (refs.startBtn) {
    return (refs.startBtn.disabled = true);
  }
}

function onStopBtnClick(e) {
  clearInterval(timeIntervalId);

  if (refs.stopBtn) {
    return (refs.startBtn.disabled = false);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
