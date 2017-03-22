(function () {

  function navCtrl($scope, $location, authService) {
    var vm = this;

    vm.currentUser = authService.currentUser();

    $scope.$on('login', function() {
      console.log('checking login');
      vm.currentUser = authService.currentUser();
    })

    vm.isLoggedIn = function() {
      return authService.isLoggedIn();
    }
    vm.logout =  function() {
      authService.logout()
      vm.currentUser = null;
      vm.isLoggedIn = null;
    }

  }

  angular
    .module('projectRoadmap')
    .controller('navCtrl', ['$scope', '$location', 'authService', navCtrl]);

})();
