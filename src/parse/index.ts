import replaceAll from '@/util/string/replace-all';
import { wrap } from '@/util/string/modifying';

import isValid from './util/is-valid';
import computeProperties from './compute-properties';
import removeSelfClosingTags from './util/remove-self-closing-tags';
import markProps from './util/mark-props';

import Iris from '@/core/iris';

const TAG_NAME = 'TAG_NAME';
const PROPS = 'PROPS';
const CHILDREN = 'CHILDREN';
const TEMPLATE = `Iris.createElement(${TAG_NAME},${PROPS},${CHILDREN})`;

function stringToHyperscript(input: string, context: Component) {
  var el: HTMLElement = document.createElement('div');

  input = removeSelfClosingTags(input);

  const marked = markProps(input);

  for (let i = 0; i < marked.length; i++) {
    input = replaceAll(input, [` ${marked[i].original}=`, ` ${marked[i].marked}=`]);
  }

  el.innerHTML = input;
  el = el.firstElementChild as HTMLElement;

  function iterate(el: HTMLElement, item?: any) {
    let result = TEMPLATE;

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

    for (const [key, value] of Object.entries(context.components || {})) {
      components[key.toLowerCase()] = { key, value };
    }

    for (const [key, value] of Object.entries(Iris.globalComponents || {})) {
      components[key.toLowerCase()] = { key, value };
    }

    const tagIsValid = isValid(tagName.toLowerCase());

    if (tagIsValid) {
      result = result.replace(TAG_NAME, `'${tagName.toLowerCase()}'`);
    } else {
      const isComponent = tagName.toLowerCase() in components;

      if (isComponent) {
        result = result.replace(TAG_NAME, `${components[tagName.toLowerCase()].key}`);
      }
    }

    const { propString, handledResult } = computeProperties(el, result, context);

    result = handledResult;

    result = result.replace(PROPS, propString);

    var children: any[] = [];

    for (let i = 0; i < childNodes.length; i++) {
      const child = iterate(childNodes[i] as HTMLElement, item);

      children.push(child);
    }

    for (let i = 0; i < children.length; i++) {
      if (!!children[i].split("'").join('').trim()) {
        result = result.replace(`,${CHILDREN}`, `,${children[i]},${CHILDREN}`);
      }
    }

    result = result.replace(`,${CHILDREN}`, '');

    return result;
  }

  const result = 'return function render() { return ' + iterate(el) + '}';

  return Function(result);
}

export default stringToHyperscript;
