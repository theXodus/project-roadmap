(function () {

  function navCtrl($location, authService) {
    var vm = this;

    vm.isLoggedIn = authService.isLoggedIn();
    vm.currentUser = authService.currentUser();
    vm.logout =  function() {
      authService.logout()
      vm.currentUser = null;
      vm.isLoggedIn = null;
    }

  }

  angular
    .module('projectRoadmap')
    .controller('navCtrl', ['$location', 'authService', navCtrl]);

})();
