import {createNode, removeNode, addClass, removeClass, setConfig} from '../src/index';

window.onload = () => {
  setConfig({ showError: true });

  const container = createNode('div',
    {style: 'color: green;', class: 'a'},
    [ 'test', 55, true, createNode('span', null, 'span 2')]
  );

  document.body.appendChild(container);
  addClass(container, 'class1');
  addClass(container, 'class2 class3 a');

  removeClass(container, 'a');
  setTimeout(() => removeNode(container), 60000);
};
