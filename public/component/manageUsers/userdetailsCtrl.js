angular.module('fullstack').controller('userdetailsCtrl', function($scope, $http, usersService, $stateParams, $state, user) {

    
  $scope.getUserDetails = function (id) {
    console.log(id);
    if (id === '' || typeof id === 'undefined') {
        $scope.userDetails = {}
        $scope.userDetails.userstatusid = 1

    } else {
      console.log(id)
        usersService.readOne(id).then(function (response) {
        $scope.userDetails = response.data
        console.log($scope.userDetails)
        $scope.created = new Date($scope.userDetails.created_at)
        // https://stackoverflow.com/questions/30537886/error-ngmodeldatefmt-expected-2015-05-29t190616-693209z-to-be-a-date-a
        });
    }
}

$scope.getUserDetails($stateParams.id)


$scope.cancel = function() {
    $state.go('users');
}


$scope.save = function(id) {
     $scope.custForApi = {
        username: $scope.userDetails.username,
        firstname: $scope.userDetails.firstname,
        lastname: $scope.userDetails.lastname,
        email: $scope.userDetails.email,
        userstatusid: $scope.userDetails.userstatusid,
        password: $scope.userDetails.password
        }
        

    if(typeof id === 'undefined') {  //add new
        usersService.create($scope.custForApi).then (function(response) {
        $scope.newCustomer = response;
        })

    } else {  //edit existing
        usersService.update(id.id, $scope.custForApi).then (function(response) {
        })
    }
    $state.go('users');  // go back to all users screen

}


    $scope.getUserStatus = function () {
        usersService.getStatus().then(function (response) {
            $scope.options = response.data
            console.log($scope.options)
            });
    }

    $scope.getUserStatus()




});