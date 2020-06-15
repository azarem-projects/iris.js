import replaceAll from '@/util/string/replace-all';
import { wrap } from '@/util/string/modifying';

import isValid from './is-valid';
import computeProperties from './compute-properties';

const TAG_NAME = 'TAG_NAME';
const PROPS = 'PROPS';
const CHILDREN = 'CHILDREN';

const template = `Iris.createElement(${TAG_NAME},${PROPS},${CHILDREN})`;

function stringToHyperscript(input: string, context: Component) {
  var $el: Element = document.createElement('div');

  $el.innerHTML = input;
  $el = $el.firstElementChild as Element;

  function iterate(el: Element, item?: any) {
    let result = template;

    const tagName = el?.tagName;

    if (!tagName) {
      var nodeValue = ((el as Element).nodeValue as string).trim();

      nodeValue = replaceAll(
        nodeValue,
        ['{{', "'+"],
        ['}}', "+'"],
        ['state', 'this.state'],
        ['props', 'this.props']
      );

      return wrap(nodeValue);
    }

    const childNodes = el.childNodes;

    var components: IIterable<any> = {};

    for (const [key, value] of Object.entries((context.components as any) || {})) {
      components[key.toLowerCase()] = { old: key, value };
    }

    const tagIsValid = isValid(tagName.toLowerCase());

    if (tagIsValid) {
      result = result.replace(TAG_NAME, `'${tagName.toLowerCase()}'`);
    } else {
      const isComponent = tagName.toLowerCase() in components;

      if (isComponent) {
        result = result.replace(TAG_NAME, `${components[tagName.toLowerCase()].old}`);
      }
    }

    const { propString, handledResult } = computeProperties(el, result);

    result = handledResult;

    result = result.replace(PROPS, propString);

    var children: any[] = [];

    childNodes.forEach((node) => {
      const child = iterate(node as Element, item);
      children.push(child);
    });

    children.forEach((child) => {
      if (!!child.split("'").join('').trim()) {
        result = result.replace(`,${CHILDREN}`, `,${child},${CHILDREN}`);
      }
    });

    result = result.replace(`,${CHILDREN}`, '');

    return result;
  }

  const result = 'return function render() { return ' + iterate($el) + '}';

  return Function(result);
}

export default stringToHyperscript;
