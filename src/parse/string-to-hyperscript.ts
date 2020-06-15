const template = 'Iris.createElement(TAGNAME,PROPS,CHILDREN)';

function isValid(input: string) {
  return document.createElement(input).toString() != "[object HTMLUnknownElement]";
}

function stringToHyperscript(input: string, context: Component) {
  var $el: Element = document.createElement('div');

  $el.innerHTML = input;
  $el = $el.firstElementChild as Element;

  function iterate(el: Element, item?: any) {
    const tagName = el?.tagName;

    if (!tagName) {
      var nodeValue = ((el as Element).nodeValue as string).trim();

      nodeValue = nodeValue.split('{{').join("' + ");
      nodeValue = nodeValue.split('}}').join(" + '");

      nodeValue = "'" + nodeValue + "'";

      nodeValue = nodeValue.split('props').join('this.props');
      nodeValue = nodeValue.split('state').join('this.state');

      return nodeValue;
    }

    const childNodes = el.childNodes;

    var result = template;

    var components: IIterable<any> = {};

    for (const [key, value] of Object.entries(context.components as any || {})) {
      components[key.toLowerCase()] = { old: key, value };
    }

    const tagIsValid = isValid(tagName.toLowerCase());

    if (tagIsValid) {
      result = result.replace('TAGNAME', `'${tagName.toLowerCase()}'`);
    } else {
      const isComponent = tagName.toLowerCase() in components;

      if (isComponent) {
        result = result.replace('TAGNAME', `${components[tagName.toLowerCase()].old}`);
      }
    }

    var propString = '{';

    for (var i = 0; i < el.attributes.length; i++) {
      var propName = el.attributes[i].name;
      var propValue = el.attributes[i].value;

      const dynamic = propName.includes(':');
      const event = propName.includes('@');
      const loop = propName.includes('b-for');

      if (dynamic) {
        propValue = propValue.split('state').join('this.state');
        propValue = propValue.split('props').join('this.props');

        propName = propName.replace(':', '');
        
        propString += `"${propName}":`;
        propString += dynamic ? `${propValue}` : `"${propValue}"`;
      } else if (event) {        
        propString += `"on${propName.replace('@', '')}":`;
        propString += `() => { this.${propValue} }`;
      } else if (loop) {
        const variable = propValue.split(' in ')[0];
        var bunch = propValue.split(' in ')[1];

        bunch = bunch.split('state').join('this.state');
        bunch = bunch.split('props').join('this.props');

        result = `${bunch}.map((${variable}) => ${result})`
      } else {
        propString += `"${propName}":`;
        propString += `"${propValue}"`;
      }

      propString += `,`
    }

    propString += '}';
    
    propString = propString.split('{,').join('{');
    propString = propString.split(',}').join('}');
    
    propString = propString.split('classname').join('className');

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

  return Function(func);
}

export default stringToHyperscript;
