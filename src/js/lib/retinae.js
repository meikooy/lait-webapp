import path from 'path';

const minPixelRatio = 2;
let els = null;

function retinate(el) {
	let src = el.dataset.src.split('.');
	let ext = src.pop();

	if (src.length > 1) {
		src = src.join('.');
	} else {
		src = src[0];
	}

	if (window.devicePixelRatio >= minPixelRatio) {
		src += '@2x.' + ext;
	} else {
		src += '.' + ext;
	}

  if (el.classList.contains('retina-bg')) {
    el.style.backgroundImage = `url(${src})`;
  } else {
    el.src = src;
  }
}

function init() {
	els = document.querySelectorAll('.retina');

	if (!els.length) {
    return;
  }

  for (let el of els) {
    if (!el.dataset.src) {
      continue;
    }

    retinate(el);
  }
}

module.exports = {init};
