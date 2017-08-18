import '../styles/index.scss';
import 'babel-polyfill';
import 'classlist-polyfill';
import Hyphens from './lib/hyphens';
import devPaths from './lib/dev-paths';
import retinae from './lib/retinae';
import domready from 'domready';
import debounce from 'debounce';
import * as indexPage from './pages/index-page';

const onResize = debounce(e => {
  Hyphens.init();
  //indexPage.resizeIntro();
}, 200);

const init = () => {
  Hyphens.init();
  devPaths.init();
  retinae.init();

  //indexPage.init();

  window.addEventListener('resize', onResize, false);
};

domready(init);
