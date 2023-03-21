import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onstartBtnRunTimer);
refs.startBtn.setAttribute('disabled', true);

let chosenDate = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onchoseDate(selectedDates[0]);
  },
};

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      refs.datePickerInput.setAttribute('disabled', true);
      refs.startBtn.setAttribute('disabled', true);
      return;
    }

    this.isActive = true;

    intervalId = setInterval(() => {
      const currenTime = Date.now();
      const deltaTime = chosenDate - currenTime;
      const time = convertMs(deltaTime);

      updateTimerUi(time);
    }, 1000);

    if (deltaTime === 0) {
      Notify.success('Time has run');
      clearInterval(intervalId);
    }
  },
};

function onchoseDate(selectedDates) {
  chosenDate = selectedDates.getTime();

  if (selectedDates < Date.now()) {
    Notify.failure('Please choose a date in the future');
  }

  if (selectedDates >= Date.now()) {
    refs.startBtn.removeAttribute('disabled');
  }
}

function onstartBtnRunTimer() {
  timer.start();
}

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimerUi({ days, hours, minutes, seconds }) {
  refs.secondsField.textContent = `${seconds}`;
  refs.minutesField.textContent = `${minutes}`;
  refs.hoursField.textContent = `${hours}`;
  refs.daysField.textContent = `${days}`;
}
