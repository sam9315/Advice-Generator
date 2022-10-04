const adviceEl = document.querySelector('.advice');
const adviceHeading = document.querySelector('.advice-heading');
const adviceBody = document.querySelector('.advice-body');
const randomizeBtn = document.querySelector('.randomize-advice');
const diceIcon = document.querySelector('#icon-dice');
const loaderIcon = document.querySelector('#icon-loader');

const API_URL = 'https://api.adviceslip.com/advice';
let isLoading = false;

const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

function setLoader(isLoading) {
  diceIcon.style.display = isLoading ? 'none' : 'block';
  loaderIcon.style.display = isLoading ? 'block' : 'none';
}

async function getAdvice() {
  if (isLoading) return;
  try {
    isLoading = true;
    setLoader(isLoading);

    // fetch the advice
    const res = await fetch(API_URL, { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const { id, advice } = data.slip;

    // animte it
    adviceEl.style.opacity = '0';
    await delay(300);

    // and render
    adviceHeading.textContent = `Advice #${id}`;
    adviceBody.textContent = `“${advice}”`;

    adviceEl.style.opacity = '1';
  } catch (error) {
    console.error(`Error: ${error}`);
  } finally {
    isLoading = false;
    setLoader(isLoading);
  }
}

randomizeBtn.addEventListener('click', getAdvice);
