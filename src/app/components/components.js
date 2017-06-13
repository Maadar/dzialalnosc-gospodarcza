import angular from 'angular';

import check from './check/check.component';
import history from './history/history.component';

export default angular
  .module('app.components', [
  ])
  .component('check', check)
  .component('history', history);
