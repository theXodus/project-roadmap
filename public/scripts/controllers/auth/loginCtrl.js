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
        .catch(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('public/views/users/profile.html');
        });
    };
  }

  angular
    .module('projectRoadmap')
    .controller('loginCtrl', ['authService', '$location', loginCtrl]);
})();
