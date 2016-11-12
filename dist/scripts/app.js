 (function() {
  function config($stateProvider, $locationProvider) {
   $locationProvider
   //disable to hashbang mode like localhost:3000/#!/album
    .html5Mode({
    enabled: true,
    requireBase: false
   });
   //add state to direct to correct template
   $stateProvider
    .state('landing', {
     url: '/',
     templateUrl: 'templates/landing.html'
    })
    .state('collection', {
     url: '/collection',
     templateUrl: 'templates/collection.html'
    })
    .state('album', {
     url: '/album',
     templateUrl: 'templates/album.html'
    });
  }

  angular
   .module('blocJams', ['ui.router'])
   .config(config);
 })();
 