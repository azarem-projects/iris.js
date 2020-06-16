import replaceAll from '@/util/string/replace-all';
import { wrap } from '@/util/string/modifying';

import isValid from './is-valid';
import computeProperties from './compute-properties';
import countMatches from '@/util/string/count-matches';
import { hasUpperCase, markUpperCase, RESTORING_KEY } from './property-cases';
import removeSelfClosingTags from './remove-self-closing-tags';

const TAG_NAME = 'TAG_NAME';
const PROPS = 'PROPS';
const CHILDREN = 'CHILDREN';
const TEMPLATE = `Iris.createElement(${TAG_NAME},${PROPS},${CHILDREN})`;

function stringToHyperscript(input: string, context: Component) {
  var el: Element = document.createElement('div');

  const props = (input.match(/\b\s(.*?)\b=/gm) || []).map((el) => el.replace('=', ''));
  const marked = [];

  input = removeSelfClosingTags(input);

  for (let i = 0; i < props.length; i++) {
    const count = countMatches(props[i], ' ');

    const prop = props[i].split(' ')[count];

    if (hasUpperCase(prop)) {
      marked.push({
        original: prop,
        marked: markUpperCase(prop, RESTORING_KEY),
      });
    }
  }

  for (let i = 0; i < marked.length; i++) {
    input = replaceAll(input, [` ${marked[i].original}=`, ` ${marked[i].marked}=`]);
  }

  el.innerHTML = input;
  el = el.firstElementChild as Element;

  function iterate(el: Element, item?: any) {
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

    for (const [key, value] of Object.entries((context.components as any) || {})) {
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

  const result = 'return function render() { return ' + iterate(el) + '}';

  return Function(result);
}

export default stringToHyperscript;
