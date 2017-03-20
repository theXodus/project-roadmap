(function() {

  function loginCtrl(authService, $location) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authService
        .login(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('users/profile');
        });
    };
  }

  angular
    .module('projectRoadmap')
    .controller('loginCtrl', ['authService', '$location', loginCtrl]);
})();
