(function() {
  function roadmapFactory($http) {
    var roadmapFactory = {};

    roadmapFactory.getRoadmap = function(id) {
      return $http.get('/api/roadmaps/' + id)
    }

    roadmapFactory.createCheckpoint = function(id, data) {
      return $http.post('/api/roadmaps/' + data + '/checkpoints', data)
    }

    roadmapFactory.updateCheckpoint = function(id, data) {
      return $http.put('/api/checkpoints/' + id, data)
    }

    roadmapFactory.deleteCheckpoint = function(id) {
      return $http.delete('/api/checkpoints/' + id)
    }

    return roadmapFactory;
  }

  angular
    .module('projectRoadmap')
    .factory('roadmapFactory', ['$http', roadmapFactory]);
})();
