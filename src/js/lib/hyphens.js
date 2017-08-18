import Hypher from 'hypher';
import lang_fi from 'hyphenation.fi';

const hyphenators = {
	fi: new Hypher(lang_fi)
};
const lang = 'fi';
const hyphenator = hyphenators[lang] || null;

let els = null;
let hyphenated = false;

function hyphenate(node) {
	node.nodeValue = hyphenator.hyphenateText(node.nodeValue, 6);
}

function dehyphenate(node) {
	node.nodeValue = node.nodeValue.replace(/\u00AD/g, '');
}

function dehyphenateTree(node) {
	for (let child of node.childNodes) {
		if (child.nodeType === 3) {
			dehyphenate(child);
		} else if (child.nodeType === 1) {
			dehyphenateTree(child);
		}
	}
}

/* eslint complexity: 0 */
function traverseNodes(node) {
	const {
		hyphensMax: max = 9999,
		hyphensMin: min = -1
	} = node.dataset;

	if (max <= window.innerWidth || min >= window.innerWidth) {
		if (hyphenated) {
			dehyphenateTree(node);
		}
		return;
	}

	for (let child of node.childNodes) {
		if (child.nodeType === 3) {
			hyphenate(child);
		} else if (child.nodeType === 1) {
			traverseNodes(child);
		}
	}
}

function init() {
	els = els || document.querySelectorAll('.hyphens');

	if (!els.length) {
		return;
	}

	// unexpected lang, remove hyphens classes
	if (!hyphenator) {
		for (let el of els) {
			el.classList.remove('hyphens');
		}
		return;
	}

	// traverse node tree and apply hyphens
	for (let el of els) {
		traverseNodes(el);
	}

	hyphenated = true;
}

export default {init};
