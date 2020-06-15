import replaceAll from '@/util/string/replace-all';
import { append, wrap } from '@/util/string/modifying';

const TAG_NAME = 'TAG_NAME';
const PROPS = 'PROPS';
const CHILDREN = 'CHILDREN';

const template = `Iris.createElement(${TAG_NAME},${PROPS},${CHILDREN})`;

function isValid(input: string) {
  return document.createElement(input).toString() != '[object HTMLUnknownElement]';
}

function extractLoopParams(input: string) {
  const split = input.split(' in ');

  const firstPart = split[0];

  const bunch = split[1].trim();
  const iterator = replaceAll(firstPart.split(',')[1] || '', ['(', ''], [')', '']).trim();
  const variable = replaceAll(firstPart.split(',')[0] || '', ['(', ''], [')', '']).trim();

  return { variable, iterator, bunch };
}

function getPropType(name: string) {
  return {
    dynamic: name.includes(':'),
    event: name.includes('@'),
    loop: name.includes('b-for'),
  }
}

function computeProperties(el: Element, result: string) {
  var output = '{';

  var handledResult = result;

  for (let i = 0; i < el.attributes.length; i++) {
    const name = el.attributes[i].name;
    const value = replaceAll(el.attributes[i].value, ['state', 'this.state'], ['props', 'this.props']);

    const { dynamic, event, loop } = getPropType(name);

    if (dynamic) {
      output = append(output, `"${name.replace(':', '')}":`);
      output = append(output, dynamic ? `${value}` : `"${value}"`);
    } else if (event) {
      output = append(output, `"on${name.replace('@', '')}":`);
      output = append(output, `() => { this.${value.includes('(') ? value : append(value, '()')} }`);
    } else if (loop) {
      const { variable, iterator, bunch } = extractLoopParams(value);
      handledResult = `${bunch}.map((${variable} ${iterator ? `,${iterator}` : ''}) => ${result})`;
    } else {
      output = append(output, append(wrap(name), ':'));
      output = append(output, wrap(value));
    }

    output = append(output, ',');
  }

  output = append(output, '}');

  output = replaceAll(output, ['{,', '{'], [',}', '}'], ['classname', 'className']);

  return { propString: output, handledResult };
}

function closeTags(input: string) {
  var result = input;

  return result;
}

function stringToHyperscript(input: string, context: Component) {
  var $el: Element = document.createElement('div');
  
  input = closeTags(input);

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
