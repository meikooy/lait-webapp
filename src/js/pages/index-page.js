let el = null;

export const init = () => {
  initializeIntro();
};

function initializeIntro() {
  el = document.querySelector('section.intro');
  resizeIntro();
}

export const resizeIntro = () => {
  if (!el) return;

  el.style.height = `${window.innerHeight}px`;
};
