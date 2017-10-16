angular.module('fullstack').controller('userdetailsCtrl', function($scope, $http, usersService, $stateParams, $state, user) {

    
  $scope.getUserDetails = function (id) {
    console.log(id);
    if (id === '' || typeof id === 'undefined') {
        $scope.userDetails = {}
        $scope.userDetails.userstatus_id = 1

    } else {
        usersService.readOne(id).then(function (response) {
        $scope.userDetails = response.data
        console.log('here it is')
        console.log($scope.userDetails)
        $scope.created = new Date($scope.userDetails.created_at)
        $scope.lastLogin = new Date($scope.userDetails.lastlogin)
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
        userstatus_id: $scope.userDetails.userstatus_id,
        usersecuritygroup_id: $scope.userDetails.usersecuritygroup_id  
    }

    console.log($scope.custForApi)
        
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



$scope.updatePW = function(id) {
    $scope.custForApi = {
       password: $scope.userDetails.password  
    }

   console.log($scope.custForApi)
   usersService.update(id.id, $scope.custForApi).then (function(response) {
 
    $state.go('users');  // go back to all users screen

    })
}











    $scope.getUserStatus = function () {
        usersService.getStatus().then(function (response) {
            $scope.options = response.data
            console.log($scope.options)
            });
    }

    $scope.getUserStatus()

    $scope.getSecurityGroup = function () {
        usersService.getSecurityGroup().then(function (response) {
            $scope.securityGroup = response.data
            console.log($scope.options)
            });
    }

    $scope.getSecurityGroup()




});