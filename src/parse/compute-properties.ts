import replaceAll from '@/util/string/replace-all';
import getPropType from './util/get-prop-type';
import { append, wrap, prepend } from '@/util/string/modifying';
import extractLoopParams from './util/extract-loop-params';
import { restoreUpperCase, RESTORING_KEY } from './util/property-cases';

function computeProperties(el: Element, result: string, component: Component) {
  var output = '{';

  var handledResult = result;

  for (let i = 0; i < el.attributes.length; i++) {
    const name = restoreUpperCase(el.attributes[i].name, RESTORING_KEY);

    const value = replaceAll(
      el.attributes[i].value,
      ['state', 'this.state'],
      ['props', 'this.props']
    );

    const {
      dynamic,
      event,
      loop,
      model,
      conditional,
      customEvent
    } = getPropType(name);

    if (dynamic) {
      output = append(output, `"${name.replace(':', '')}":`);
      output = append(output, dynamic ? `${value}` : `"${value}"`);
    } else if (event) {
      const event = name.split('.')[0];
      const modifier = name.split('.')[1];

      const modifiers: IIterable<string> = {
        prevent: 'event.preventDefault();',
        stop: 'event.stopPropagation();',
      };

      output = append(output, `"on${event.replace('@', '')}":`);
      output = append(
        output,
        `() => { ${modifier ? modifiers[modifier] : ''} this.${
          value.includes('(') ? value : append(value, '()')
        } }`
      );
    } else if (loop) {
      const { variable, iterator, bunch } = extractLoopParams(value);
      handledResult = `${bunch}.map((${variable} ${iterator ? `,${iterator}` : ''}) => ${result})`;
    } else if (conditional) {
      /**
       * Where might me some issues with this.
       * If so => Iris.createElement('div', null) insead of ' '
       */
      handledResult = `${value} ? ${result} : ' '`;
    } else if (model) {
      const inputType = (el as HTMLInputElement).type;

      const events: IIterable<string> = {
        text: 'oninput',
        checkbox: 'onclick',
      };

      const values: IIterable<string> = {
        text: 'value',
        checkbox: 'checked',
      };

      const matchEvent = events[inputType];
      const matchValue = values[inputType];

      if (matchEvent && matchValue) {
        output = append(output, append(wrap(matchValue), ':'));
        output = append(output, prepend(value, 'this.state.'));
        output = append(output, ',');

        output = append(output, append(wrap(matchEvent), ':'));
        output = append(
          output,
          `() => { this.setState({ ${value}: event.target.${matchValue} }) }`
        );
      } else {
        output = append(output, append(wrap('model'), ':'));
        output = append(output, prepend(value, 'this.state.'));
        output = append(output, ',');

        component.childEvents.push({
          childEvent: 'set-model',
          parentEvent: `set-${value}`,
        });
      }
    } else if (customEvent) {
      const childEvent = name.split(':')[1];
      const parentEvent = value;

      component.childEvents.push({
        childEvent,
        parentEvent,
      });
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
