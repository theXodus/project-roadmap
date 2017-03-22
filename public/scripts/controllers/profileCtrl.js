(function() {
  function profileCtrl(mainFactory, $location, authService) {
    var vm = this;

    vm.currentUser = authService.currentUser();

    vm.roadmaps = mainFactory.getRoadmaps()
      .then(function(res) {
        vm.roadmaps = res.data;
        console.log(res.data);
      }, function(res) {
        console.log('Error: ' + res);
      });
  }


  angular
    .module('projectRoadmap')
    .controller('profileCtrl', ['mainFactory', '$location','authService', profileCtrl]);
})();
