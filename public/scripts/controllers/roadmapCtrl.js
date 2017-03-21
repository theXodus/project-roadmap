(function() {
  function roadmapCtrl($http, $scope, $stateParams, roadmapFactory, authService) {
    var roadmap = this;
    roadmap.formData = {};
    roadmap.checkpoints = [];
    var roadmap_id = $stateParams.id;
    $scope.currentUser = authService.currentUser();

    roadmapFactory.getRoadmap(roadmap_id)
      .then(function(res) {
        roadmap.checkpoints = res.data.checkpoints;
        roadmap.title = res.data.name;
        roadmap.creator = res.data.creator
      }, function(res) {
        console.log('Error: ' + res);
      })

    roadmap.createCheckpoint = function() {
      roadmapFactory.createCheckpoint(roadmap_id, roadmap.formData)
        .then(function(res) {
          roadmap.formData = {};
          roadmap.checkpoints = res.data;

        }, function(res) {
          console.log('Error: ' + res);
        });
    }

    $scope.editedCheckpoint = {};
    roadmap.CPindex = -1; // Keeps track of the index for the edit form

    roadmap.toggleEditForm = function(cp, index) {
      roadmap.show = true;
      roadmap.CPindex = index;
      $scope.editedCheckpoint = angular.copy(cp);
    }

    roadmap.updateCheckpoint = function(checkpoint) {
      roadmap.show = false;
      roadmap.CPindex = -1;
      roadmapFactory.updateCheckpoint(checkpoint._id, $scope.editedCheckpoint)
        .then(function(res) {
          roadmap.checkpoints = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        })
    }

    roadmap.deleteCheckpoint = function(id) {
      roadmapFactory.deleteCheckpoint(id)
        .then(function(res) {
          roadmap.checkpoints = res.data;
        }, function(res) {
          console.log('Error: ' + res);
        });
    }
  }

  angular
    .module('projectRoadmap')
    .controller('roadmapCtrl', ['$http', '$scope', '$stateParams', 'roadmapFactory', 'authService', roadmapCtrl]);
})();
