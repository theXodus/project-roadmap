(function() {
  function mainFactory($http) {
    var mainFactory = {};

    mainFactory.getRoadmaps = function() {
      return $http.get('/api/roadmaps');
    }

    mainFactory.createRoadmap = function(data) {
      return $http.post('/api/roadmaps', data);
    }

    mainFactory.deleteRoadmap = function(id) {
      return $http.delete('/api/roadmaps/' + id)
    }

    return mainFactory;
  }

  angular
    .module('projectRoadmap')
    .factory('mainFactory', ['$http', mainFactory]);
})();
