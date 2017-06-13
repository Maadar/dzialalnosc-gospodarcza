import angular from 'angular';

import resource from './resource';
import model from './model';

export default angular
  .module('app.services', [])
  .service({
    resource,
    model
  });
