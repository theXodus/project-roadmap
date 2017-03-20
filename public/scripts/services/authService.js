(function () {

  angular
    .module('projectRoadmap')
    .service('authService', authService);

  authService.$inject = ['$http', '$window'];

  function authService ($http, $window) {

    var saveToken = function (token) {
      console.log("saveToken: " + token)
      $window.localStorage['user-token'] = token;
    };

    var getToken = function () {
      console.log("getToken: " + $window.localStorage['user-token'])
      return $window.localStorage['user-token'];
    };

    var isLoggedIn = function() {
      var token = $window.localStorage['user-token'];
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).then(function(data){
        saveToken(data.data.token);
      });
    };

    login = function(user) {
      return $http.post('/api/login', user).then(function(data) {
        saveToken(data.data.token);
      });
    };

    logout = function() {
      $window.localStorage.removeItem('user-token');
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };
  }


})();
