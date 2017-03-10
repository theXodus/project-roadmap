(function() {
  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $urlRouterProvider.otherwise('roadmaps')

    $stateProvider
      .state('roadmaps', {
        url: '/roadmaps',
        templateUrl: '../views/roadmaps/index.html',
        controller: 'mainCtrl as main'
      })
      .state('roadmap', {
        url: '/roadmaps/:id',
        templateUrl: '../views/roadmaps/show.html',
        controller: 'roadmapCtrl as roadmap'
      })
      .state('checkpoint', {
        url: '/roadmaps/:id/checkpoints/:cpid/edit',
        templateUrl: '../views/checkpoints/edit.html',
        controller: 'roadmapCtrl as roadmap'
      })
  }

  angular
    .module('projectRoadmap', ['ui.router'])
    .config(config);
})();
