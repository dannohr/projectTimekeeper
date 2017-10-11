angular.module('fullstack').controller('timesheetdetalCtrl', function($scope, user, $http, timesheetSrvc, $stateParams, $state) {
    
    $scope.test = "Test of Entry Page"

    $scope.cancel = function() {
        $state.go('timesheet');
    }

        
    // $scope.getUsers = function () {
    //     usersService.readAll().then(function (response) {
    //         console.log(response.data)
    //         $scope.allusers = response.data
    //         });
    // }
    
    // $scope.getUsers()

    
    // $scope.deleteUser = function (id) {
    //     usersService.delete(id.id).then(function (response) {
    //         $scope.getUsers()
    //         });
    //     }

    // $scope.getUserStatus = function () {
    //     usersService.getStatus().then(function (response) {
    //         $scope.options = response.data
    //         console.log($scope.options)
    //         });
    // }

    // $scope.getUserStatus()

    
    
    


});
    