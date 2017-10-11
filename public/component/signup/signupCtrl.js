angular.module('fullstack').controller("signupCtrl", function($scope, $http, $rootScope, $location, $state, usersService) {
    
  
  $scope.signup = function(user) {
      if (user.password == user.password2) {
        console.log(user);
        usersService.create(user).then (function(response) {
            $scope.newCustomer = response;
        })
      }
    else {
      console.log('passwords do not match')
    }
  };
});