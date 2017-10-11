angular.module('fullstack').controller("signupCtrl", function($scope, $http, $rootScope, $location, $state, usersService) {
    
  
  $scope.signup = function(user) {
      if (user.password == user.password2) {
        console.log(user);
        usersService.create(user).then (function(response) {
            $scope.newCustomer = response;
        })
      }
    else {
      console.log('passwords don not match')
    }
  };
});


//   $scope.save = function(id) {
//     $scope.custForApi = {
//        username: $scope.userDetails.username,
//        firstname: $scope.userDetails.firstname,
//        lastname: $scope.userDetails.lastname,
//        email: $scope.userDetails.email,
//        userstatusfk: $scope.userDetails.userstatusfk
//        }
       

//    if(typeof id === 'undefined') {  //add new
//        usersService.create($scope.custForApi).then (function(response) {
//        $scope.newCustomer = response;
//        })

//    } else {  //edit existing
//        usersService.update(id.id, $scope.custForApi).then (function(response) {
//        })
//    }
//    $state.go('users');  // go back to all users screen

// }


  // $scope.custForApi = {
        //     username: $scope.userDetails.username,
        //     firstname: $scope.userDetails.firstname,
        //     lastname: $scope.userDetails.lastname,
        //     email: $scope.userDetails.email,
        //     userstatusfk: $scope.userDetails.userstatusfk
        // }