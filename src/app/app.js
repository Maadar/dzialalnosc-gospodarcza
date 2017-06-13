import angular from 'angular';
import Components from './components/components';
import services from './services/services';
import 'normalize.css';
import localstorage from 'ngstorage';
import AppComponent from './app.component';

angular.module('app', [
  Components.name,
  services.name,
  localstorage.name
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
