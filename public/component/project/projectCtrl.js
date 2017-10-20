angular.module('fullstack').controller('projectCtrl', function($scope, user, manageProjSrvc, usersService) {
    
    $scope.projectTest = "Test of Projects"

    $scope.user = user
    $scope.userFilter = user.id
    // console.log('logged in user is')
    // console.log(user)

    $scope.getProjects = function () {
        manageProjSrvc.readAll().then(function (response) {
            console.log('all projects:')
            console.log(response.data)
            $scope.allprojects = response.data
            });
    }


    // get list of users to populate ng-option
    $scope.getUsers = function () {
        usersService.readAll().then(function (response) {
            $scope.allusers = response.data
            // console.log($scope.allusers)
            });
    }
    $scope.getUsers()
    

    $scope.getProjectUser = function (id) {
        manageProjSrvc.getProjectUser(id).then(function (response) {
            $scope.projectuser = response
            console.log($scope.projectuser)
            });
    }
    
    //Initially loaded data when page opens
    $scope.getProjectUser($scope.userFilter)

  

});