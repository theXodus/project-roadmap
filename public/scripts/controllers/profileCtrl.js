(function() {
  function profileCtrl($location, authService) {
    var vm = this;

    vm.currentUser = authService.currentUser();

    vm.logout = authService.logout();
  }


  angular
    .module('projectRoadmap')
    .controller('profileCtrl', ['$location','authService', profileCtrl]);
})();
