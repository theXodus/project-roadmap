(function () {

  function navCtrl($rootScope, $location, authService) {
    var vm = this;

    vm.currentUser = authService.currentUser();
    vm.isLoggedIn = authService.isLoggedIn();
    vm.logout =  function() {
      authService.logout()
      vm.currentUser = null;
      vm.isLoggedIn = null;
    }

  }

  angular
    .module('projectRoadmap')
    .controller('navCtrl', ['$rootScope', '$location', 'authService', navCtrl]);

})();
