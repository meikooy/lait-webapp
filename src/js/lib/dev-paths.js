function processNodeList(nodes, f) {
  if (!nodes) {
    return;
  }

  for (let node of nodes) {
    f(node);
  }
}

function init() {
  if (process.env.NODE_ENV !== 'development'
      || process.env.TARGET !== 'local') {
    return;
  }

  const processes = [
    [document.querySelectorAll('a'), a => {
      if (a.classList.contains('external')) {
        return;
      }

      a.href = a.href === `${location.origin}/` ? a.href : `${a.href}.html`;
    }]
  ];

  processes.forEach(([nodes, processor]) => processNodeList(nodes, processor));
}

export default {init};
