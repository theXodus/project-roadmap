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
      .state('roadmap/new', {
        url: '/roadmap/new',
        templateUrl: '../views/roadmaps/new.html',
        controller: 'mainCtrl as main'
      })
      .state('checkpoint', {
        url: '/roadmaps/:id/checkpoints/:cpid/edit',
        templateUrl: '../views/checkpoints/edit.html',
        controller: 'roadmapCtrl as roadmap'
      })
      .state('register', {
        url: '/register',
        templateUrl: '../views/users/register.html',
        controller: 'registerCtrl as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: '../views/users/login.html',
        controller: 'loginCtrl as vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '../views/users/profile.html',
        controller: 'profileCtrl as vm'
      })
  }

  function run($rootScope, $location, authService) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authService.isLoggedIn()) {
        $location.path('roadmaps');
      }
    });
  }


  angular
    .module('projectRoadmap', ['ui.router'])
    .config(config)
    .run(['$rootScope', '$location', 'authService', run]);
})();
