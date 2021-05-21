/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';
import App from '../components/App';

// let Component, Target;

export default function renderApp() {
  document.getElementById('app-root').innerHTML = '';
  document.getElementById('app-root').appendChild(<App />);
}
