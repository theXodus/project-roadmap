(function() {
  function mainCtrl($http, $scope, mainFactory, authService) {
    $scope.formData = {};
    $scope.roadmaps = [];
    $scope.currentUser = authService.currentUser();

    mainFactory.getRoadmaps()
      .then(function(res) {
        $scope.roadmaps = res.data;
        console.log(res.data);
      }, function(res) {
        console.log('Error: ' + res);
      });

    this.createRoadmap = function() {
      var user = authService.currentUser()
      $scope.formData.creator = user;
      console.log($scope.formData)
      mainFactory.createRoadmap($scope.formData)
        .then(function(res) {
          $scope.formData = {};
          $scope.roadmaps = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        });
    }

    this.deleteRoadmap = function(id) {
      mainFactory.deleteRoadmap(id)
        .then(function(res) {
          $scope.roadmaps = res.data;
        }, function(res) {
          console.log('Error: ' + res)
        });
    }
  }

  angular
    .module('projectRoadmap')
    .controller('mainCtrl', ['$http', '$scope', 'mainFactory', 'authService', mainCtrl]);
})();
