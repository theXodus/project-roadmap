console.log("it's working!");

// define app and routes
var projectRoadmap = angular.module('projectRoadmap', ['ui.router']);

// ROUTES

projectRoadmap.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('roadmaps')

  $stateProvider
    .state('roadmaps', {
      url: '/roadmaps',
      templateUrl: '../views/roadmaps/index.html',
      controller: 'mainController as main'
    })
    .state('roadmap', {
      url: '/roadmaps/:id',
      templateUrl: '../views/roadmaps/show.html',
      controller: 'roadmapController as roadmap'
    })
    .state('checkpoint', {
      url: '/roadmaps/:id/checkpoints/:cpid/edit',
      templateUrl: '../views/checkpoints/edit.html',
      controller: 'roadmapController as roadmap'
    })
})

// define controllers
function mainController($http, $scope) {
  $scope.formData = {};
  $scope.roadmaps = [];

  $http.get('/api/roadmaps')
    .then(function(res) {
      $scope.roadmaps = res.data;
      console.log(res.data);
    }, function(res) {
      console.log('Error: ' + res);
    });

  this.createRoadmap = function() {
    console.log("creating roadmap");
    $http.post('/api/roadmaps', $scope.formData)
      .then(function(res) {
        $scope.formData = {};
        $scope.roadmaps = res.data;
      }, function(res) {
        console.log('Error: ' + res);
      });
  }

  this.deleteRoadmap = function(id) {
    console.log("deleting");
    $http.delete('/api/roadmaps/' + id)
      .then(function(res) {
        $scope.roadmaps = res.data;
      }, function(res) {
        console.log('Error: ' + res)
      });
  }
}

function roadmapController($http, $scope, $stateParams) {
  $scope.formData = {};
  $scope.checkpoints = [];


  console.log("hello from the roadmap controller");
  var roadmap_id = $stateParams.id;

  $http.get('/api/roadmaps/' + roadmap_id)
    .then(function(res) {
      $scope.checkpoints = res.data.checkpoints;
      $scope.roadmapTitle = res.data.name;
    }, function(res) {
      console.log('Error: ' + res);
    })

  this.createCheckpoint = function() {
    console.log("creating checkpoint");
    $http.post('/api/roadmaps/' + roadmap_id + '/checkpoints', $scope.formData)
      .then(function(res) {
        $scope.formData = {};
        this.checkpoints = res.data;
        console.log(res.data);
      }, function(res) {
        console.log('Error: ' + res);
      });
  }

  $scope.editedCheckpoint = {};
  this.CPindex = -1;

  this.toggleEditForm = function(cp, index) {
    this.show = true;
    this.CPindex = index;
    $scope.editedCheckpoint = angular.copy(cp);
  }

  this.updateCheckpoint = function(checkpoint) {
    console.log("updating checkpoint");
    this.show = false;
    this.CPindex = -1;
    $http.put('/api/checkpoints/' + checkpoint._id, $scope.editedCheckpoint)
      .then(function(res) {
        this.checkpoints = res.data;
      }, function(res) {
        console.log('Error: ' + res);
      })
  }

  this.deleteCheckpoint = function(id) {
    console.log("deleting checkpoint");
    $http.delete('/api/checkpoints/' + id)
      .then(function(res) {
        this.checkpoints = res.data;
      }, function(res) {
        console.log('Error: ' + res);
      });
  }
}

projectRoadmap.controller('mainController', ['$http', '$scope', mainController]);
projectRoadmap.controller('roadmapController', ['$http', '$scope', '$stateParams', roadmapController]);
// Use $http service to make requests for data to the backend routes
