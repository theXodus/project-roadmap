(function() {
  function mainFactory(authService, $http) {
    var mainFactory = {};

    mainFactory.getRoadmaps = function() {
      return $http.get('/api/roadmaps');
    }

    mainFactory.createRoadmap = function(data) {
      return $http.post('/api/roadmaps', data, { headers: { Authorization: 'Bearer ' + authService.getToken()}});
    }

    mainFactory.deleteRoadmap = function(id) {
      return $http.delete('/api/roadmaps/' + id, { headers: { Authorization: 'Bearer ' + authService.getToken()}})
    }

    return mainFactory;
  }

  angular
    .module('projectRoadmap')
    .factory('mainFactory', ['authService', '$http', mainFactory]);
})();
