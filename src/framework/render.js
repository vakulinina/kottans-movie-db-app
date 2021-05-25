/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from './element';
import { current } from './hooks';

let timer;

export function render(Component, target) {
  function workLoop() {
    if (current.shouldReRender) {
      current.shouldReRender = false;
      target.replaceChildren(<Component />);
    }

    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(workLoop);
  }
  timer = requestAnimationFrame(workLoop);
}

export default render;
