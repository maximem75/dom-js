// --- Variables --- //

const ERROR_TAG = '[ERROR] -> Invalid tag name';
const ERROR_ATTRIBUTES = '[ERROR] -> Invalid attributes';
const ERROR_CONTENT = '[ERROR] -> Invalid content';
const ERROR_NODE = '[ERROR] -> Invalid node';
const ERROR_CLASS = '[ERROR] -> Empty class list';

const config = {
  showError: false,
  isIE: detectIE(),
  namespace: 'http://www.w3.org/2000/svg'
};

// --- Public functions --- //

/**
 * Create and return a node
 *
 * @param tag
 * @param attributes
 * @param content
 * @param isSvg
 * @returns {*}
 */
export function createNode(tag, attributes, content, isSvg = false) {
  if (!validParams(tag, attributes, content))
    return null;

  if (content instanceof Element)
    content = [content];

  if (content instanceof Array && content.length) {
    const item = build(tag, attributes, content, isSvg);

    content.forEach(child => {
      if (child instanceof Element)
        item.appendChild(child);
      else if (typeofText(child))
        item.appendChild(build('span', null, child, isSvg));
      else
        errorMessage(ERROR_CONTENT);
    });

    return item;
  }

  return build(tag, attributes, content, isSvg);
}

/**
 * Create and return an SVG node
 *
 * @param tag
 * @param attributes
 * @param content
 * @returns {*}
 */
export function createSVG(tag, attributes, content) {
  return createNode(tag, attributes, content, true);
}

/**
 * Remove a node
 *
 * @param node
 */
export function removeNode(node) {
  if (node && node instanceof Element && node.parentNode)
    node.parentNode.removeChild(node);
  else
    errorMessage(ERROR_NODE);
}

/**
 * Set node class
 * (ex: 'first-class' / 'first-class second-class' / ['first-class', 'second-class'])
 *
 * @param node
 * @param list
 * @returns {*}
 */
export function addClass(node, list) {
  if (!node || node && node instanceof Element === false)
    return errorMessage(ERROR_NODE);

  if (!list || (list && list instanceof Array === false && !typeofText(list)))
    return errorMessage(ERROR_CLASS);

  if (typeofText(list))
    list = list.split(' ');

  if (config.isIE) {
    const classes = node.className.split(' ');
    node.className += ` ${list.filter(c => classes.indexOf(c) === -1).join(' ')}`;
  }
  else
    list.forEach(value => node.classList.add(value));

}

/**
 * Set node class
 * (ex: 'first-class' / 'first-class second-class' / ['first-class', 'second-class'])
 *
 * @param node
 * @param list
 * @returns {*}
 */
export function removeClass(node, list) {
  if (!node || node && node instanceof Element === false)
    return errorMessage(ERROR_NODE);

  if (!list || (list && list instanceof Array === false && !typeofText(list)))
    return errorMessage(ERROR_CLASS);

  if (typeofText(list))
    list = list.split(' ');

  if (config.isIE) {
    const classes = node.className.split(' ');
    node.className = classes.filter(c => list.indexOf(c) === -1).join(' ');
  }
  else
    list.forEach(value => node.classList.remove(value));
}

/**
 * Set current config
 * ex:{ showError: true }
 *
 * @param object
 */
export function setConfig(object) {
  if (object && object instanceof Array === false && object instanceof Object)
    Object.keys(object).forEach(key => config[key] = object[key]);
}

// --- Private functions --- //

function build(tag, attributes, textContent, isSvg) {
  const node = !isSvg ? document.createElement(tag) : document.createElementNS(config.namespace, tag);

  if (typeofText(textContent))
    node.textContent = textContent;

  if (attributes !== null && attributes instanceof Array === false && attributes instanceof Object && Object.keys(attributes).length)
    Object.keys(attributes).forEach(key => node.setAttribute(key, attributes[key]));

  return node;
}

function validParams(tag, attributes, content) {
  if (!tag || (tag && typeof tag !== 'string'))
    return errorMessage(ERROR_TAG);

  if (attributes !== null && attributes !== undefined && (attributes instanceof Array || attributes instanceof Object === false))
    return errorMessage(ERROR_ATTRIBUTES);

  if (content !== null && content !== undefined && content instanceof Array === false && content instanceof Element === false && !typeofText(content))
    return errorMessage(ERROR_CONTENT);

  return true;
}

function typeofText(item) {
  return typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean';
}

function errorMessage(message) {
  if (config.showError && !config.isIE)
    console.log(`%c ${message} `, 'background-color: #900404; color: #fff; padding: 3px 0');

  if (config.showError && config.isIE)
    console.error(message);

  return false;
}

function detectIE() {
  const isIE = /*@cc_on!@*/!!document.documentMode;
  const isEdge = !isIE && !!window.StyleMedia;

  return isIE || isEdge;
}
