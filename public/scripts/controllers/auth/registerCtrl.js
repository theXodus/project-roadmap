(function() {

  function registerCtrl(authService, $location) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authService.register(vm.credentials)
        .catch(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
      }
  }

  angular
    .module('projectRoadmap')
    .controller('registerCtrl', ['authService', '$location', registerCtrl]);
})();
