(function() {
  function navCtrl($location, authService) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
  }

  angular
    .module('projectRoadmap')
    .controller('navCtrl', ['$location','authService', navCtrl]);
})();
