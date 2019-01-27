import {createNode, createSVG, removeNode, addClass, removeClass, setConfig} from '../src/index';

window.onload = () => {
  setConfig({ showError: true });

  const container = createNode('div',
    {style: 'color: green;', class: 'a'},
    [ 'test', 55, true, createNode('span', null, 'span 2')]
  );

  const svg = createSVG('svg',
    { id: 'svg-test', style: 'width: 100px; height: 100px; background-color: red;' },
    createSVG('g', null,
      createSVG('rect', { width: '50px', height: '50px', fill: 'black' }, null)
    )
  );

  document.body.appendChild(container);
  document.body.appendChild(svg);

  addClass(container, 'class1');
  addClass(container, 'class2 class3 a');
  addClass(container, ['class4']);

  removeClass(container, 'a');
  removeClass(container, ['class2']);
  setTimeout(() => removeNode(container), 60000);
};
