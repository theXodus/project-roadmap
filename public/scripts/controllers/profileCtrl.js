(function() {
  function profileCtrl($location, authService) {
    var vm = this;

    vm.currentUser = authService.currentUser();

  }


  angular
    .module('projectRoadmap')
    .controller('profileCtrl', ['$location','authService', profileCtrl]);
})();
