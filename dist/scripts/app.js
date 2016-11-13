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
     controller: 'LandingCtrl as landing',
     templateUrl: 'templates/landing.html'
    })
    .state('collection', {
     url: '/collection',
     controller: 'CollectionCtrl as collection',
     templateUrl: 'templates/collection.html'
    })
    .state('album', {
     url: '/album',
     controller: 'AlbumCtrl as album',
     templateUrl: 'templates/album.html'
    });
  }

  angular
   .module('blocJams', ['ui.router'])
   .config(config);
 })();
 