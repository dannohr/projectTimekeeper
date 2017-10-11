angular.module('fullstack').controller('mainCtrl', function (mainSrvc, $scope, $location, $http, $rootScope, $state) {

  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $state.go('home');
      });
  }



});



