// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  sbtBtn: document.querySelector('button'),
};
console.log(refs.sbtBtn);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
