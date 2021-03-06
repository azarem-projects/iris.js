import Iris from '@/core/iris';
import Plugin from '@/plugins/plugin';

function install(plugin: Plugin) {
  Object.assign(Iris.toInject, plugin.injectIntoComponent());
  Object.assign(Iris.globalComponents, plugin.declareGlobalComponents());
  
  for (const [key, value] of Object.entries(plugin.injectIntoIris())) {
    Object.defineProperty(Iris, key, {
      value
    });
  }
}

export default install;
