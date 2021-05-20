import App from '../components/App';

export default function renderApp() {
  document.querySelector('#app-root').innerHTML = `${App()}`;
}
