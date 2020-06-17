import declareGlobally from './util/declare-globally';

import Iris from '@/core/iris';

declareGlobally(Iris, 'Iris');

import StateManager from '@/plugins/examples/state-manager';
import Ajax from '@/plugins/examples/ajax';
// import Router from '@/plugins/examples/router/index';

declareGlobally(StateManager, 'StateManager');
declareGlobally(Ajax, 'Ajax');
// declareGlobally(Router, 'Router');
