import angular from 'angular';

import check from './check.component';
import resource from '../../services/services';

export default angular
  .module('appCheck', [
    resource.name
  ])
  .component('check', check);
