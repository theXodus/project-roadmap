(function() {
  function roadmapCtrl($http, $scope, $stateParams, roadmapFactory) {
    $scope.formData = {};
    $scope.checkpoints = [];

    var roadmap_id = $stateParams.id;

    roadmapFactory.getRoadmap(roadmap_id)
      .then(function(res) {
        $scope.checkpoints = res.data.checkpoints;
        $scope.roadmapTitle = res.data.name;
      }, function(res) {
        console.log('Error: ' + res);
      })

    this.createCheckpoint = function() {
      roadmapFactory.createCheckpoint(roadmap_id, $scope.formData)
        .then(function(res) {
          $scope.formData = {};
          this.checkpoints = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        });
    }

    $scope.editedCheckpoint = {};
    // Keeps track of the index for the edit form
    this.CPindex = -1;

    this.toggleEditForm = function(cp, index) {
      this.show = true;
      this.CPindex = index;
      $scope.editedCheckpoint = angular.copy(cp);
    }

    this.updateCheckpoint = function(checkpoint) {
      this.show = false;
      this.CPindex = -1;
      roadmapFactory.updateCheckpoint(checkpoint._id, $scope.editedCheckpoint)
        .then(function(res) {
          this.checkpoints = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        })
    }

    this.deleteCheckpoint = function(id) {
      roadmapFactory.deleteCheckpoint(id)
        .then(function(res) {
          this.checkpoints = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        });
    }
  }

  angular
    .module('projectRoadmap')
    .controller('roadmapCtrl', ['$http', '$scope', '$stateParams', 'roadmapFactory', roadmapCtrl]);
})();
