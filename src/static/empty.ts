import Component from '@/core/component';

class Empty extends Component {
  $render(h: THyperscript) {
    return h('div', null);
  }
}

export default Empty;
