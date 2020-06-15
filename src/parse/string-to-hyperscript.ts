const template = 'Iris.createElement(TAGNAME,PROPS,CHILDREN)';

function isValid(input: string) {
  return document.createElement(input).toString() != "[object HTMLUnknownElement]";
}

/**
 * return function render() {
 *  return Iris.createElement('div', {}, 
 *  ('').toString(),
 *  Iris.createElement('div', {},
 *    ('').toString(),
 *    Iris.createElement('span', {},
 *      ('' + ( this.props.key ) + '').toString()
 *    ),
 *    ('').toString()),
 *    ('').toString()
 *  )
 * }
 */

function stringToHyperscript(input: string, context: Component) {
  var $el: Element = document.createElement('div');

  $el.innerHTML = input;
  // $el = $el.firstElementChild as Element;

  function iterate(el: Element, item?: any) {
    const tagName = el?.tagName;

    if (!tagName) {
      var nodeValue = ((el as Element).nodeValue as string).trim();

      nodeValue = nodeValue.split('{{').join("' + (");
      nodeValue = nodeValue.split('}}').join(") + '");

      nodeValue = "('" + nodeValue + "')";

      nodeValue = nodeValue.split('props').join('this.props');
      nodeValue = nodeValue.split('state').join('this.state');
      nodeValue = nodeValue.split('(').join('').split(')').join('');

      console.log(nodeValue);

      const result = `${nodeValue}`

      return result;
    }

    const props = Object.assign(
      {},
      ...Array.from(el.attributes || {}).map((prop: any) => ({ [prop.name]: prop.value }))
    );

    const childNodes = el.childNodes;

    var result = template;

    var components: IIterable<any> = {};

    for (const [key, value] of Object.entries(context.components as any || {})) {
      components[key.toLowerCase()] = { old: key, value };
    }

    result = result.replace('TAGNAME', tagName.toLowerCase() in components ? `${components[tagName.toLowerCase()].old}` : `'${tagName.toLowerCase()}'`);

    var propString = '{';

    for (var i = 0; i < el.attributes.length; i++) {
      var propName = el.attributes[i].name;
      const dynamic = propName.includes(':');
      var propValue = el.attributes[i].value;

      if (dynamic) {
        propValue = propValue.split('state').join('this.state');
        propValue = propValue.split('props').join('this.props');

        propName = propName.replace(':', '');
      }

      propString += `"${propName}":`;
      propString += dynamic ? `${propValue}` : `"${propValue}"`;
      propString += `,`
    }

    propString += '}';

    result = result.replace('PROPS', propString);

    var children: any[] = [];

    childNodes.forEach((node) => {
      const child = iterate(node as Element, item);
      children.push(child);
    });

    children.forEach((child) => {
      if (!!child.split("'").join('').trim()) {
        result = result.replace(',CHILDREN', `,${child},CHILDREN`);
      }
    });

    result = result.replace(',CHILDREN', '');

    return result;
  }

  const func = 'return function render() { return ' + iterate($el) + '}';

  // console.log(func);

  return Function(func);
}

export default stringToHyperscript;
