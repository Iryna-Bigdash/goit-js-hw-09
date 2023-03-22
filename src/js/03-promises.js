import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmitForm(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  let promiseTimerDelay = Number(delay.value);
  const promiseDelayStep = Number(step.value);
  const promiseAmount = Number(amount.value);

  for (let i = 1; i <= promiseAmount; i++) {
    createPromise(i, promiseTimerDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    promiseTimerDelay += promiseDelayStep;
  }
  e.currentTarget.reset();
}
