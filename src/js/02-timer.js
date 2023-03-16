import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePickerInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', onstartBtnRunTimer);

let chosenDate = 0;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    onstartBtnRunTimer(selectedDates[0]);

    if (selectedDates) {
    }
  },
  disable: [
    function (date) {
      // return true to disable
      return date < new Date();
    },
  ],
};

function onstartBtnRunTimer(selectedDates) {
  chosenDate = selectedDates.getTime();

  if (selectedDates < Date.now()) {
    window.alert('Please choose a date in the future');
    refs.startBtn.setAttribute('disabled', true);
  }

   else if (selectedDates >= Date.now()) {
    refs.datePickerInput.setAttribute('disabled', false);
    refs.startBtn.setAttribute('disabled', false);
     timer.start();
  }
 
}

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      refs.datePickerInput.setAttribute('disabled', true);
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
      window.alert('Time has run');
      clearInterval(intervalId);
    }
  },
};

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
