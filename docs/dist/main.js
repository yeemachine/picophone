// import './hmr';
import App from './App.svelte.js';
// import '@pwabuilder/pwaupdate'

const app = new App({
  target: document.body
});

window.app = app;

export default app;

const initSW = () => {
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
      }).catch((e) => {
        console.log(e);
    });
  }
}
initSW()