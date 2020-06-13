import Iris from '@/core/iris';
import Plugin from '@/plugins/plugin';

function install(plugin: Plugin) {
  Object.assign(Iris.toInject, plugin.inject());
}

export default install;
