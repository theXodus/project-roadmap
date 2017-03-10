(function() {
  function mainCtrl($http, $scope, mainFactory) {
    $scope.formData = {};
    $scope.roadmaps = [];


    mainFactory.getRoadmaps()
      .then(function(res) {
        $scope.roadmaps = res.data;
        console.log(res.data);
      }, function(res) {
        console.log('Error: ' + res);
      });

    this.createRoadmap = function() {
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
    .controller('mainCtrl', ['$http', '$scope', 'mainFactory', mainCtrl]);
})();
