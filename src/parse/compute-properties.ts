import replaceAll from '@/util/string/replace-all';
import getPropType from './get-prop-type';
import { append, wrap } from '@/util/string/modifying';
import extractLoopParams from './extract-loop-params';

function computeProperties(el: Element, result: string) {
  var output = '{';

  var handledResult = result;

  for (let i = 0; i < el.attributes.length; i++) {
    const name = el.attributes[i].name;
    const value = replaceAll(
      el.attributes[i].value,
      ['state', 'this.state'],
      ['props', 'this.props']
    );

    const { dynamic, event, loop } = getPropType(name);

    if (dynamic) {
      output = append(output, `"${name.replace(':', '')}":`);
      output = append(output, dynamic ? `${value}` : `"${value}"`);
    } else if (event) {
      output = append(output, `"on${name.replace('@', '')}":`);
      output = append(
        output,
        `() => { this.${value.includes('(') ? value : append(value, '()')} }`
      );
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

  output = replaceAll(
    output,
    ['{,', '{'],
    [',}', '}'],
    ['class', 'className'],
    ['classname', 'className']
  );

  return { propString: output, handledResult };
}

export default computeProperties;
