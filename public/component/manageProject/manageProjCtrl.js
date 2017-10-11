angular.module('fullstack').controller('manageProjCtrl', function($scope, user, manageProjSrvc) {
    
    $scope.manageProjTest = "Test of Project Management Page in Angular"
    console.log('user from manageProjCtrl is');
    console.log(user);
    
    


    $scope.getProjects = function () {
        manageProjSrvc.readAll().then(function (response) {
            console.log(response.data)
            $scope.allprojects = response.data
            });
    }
    
    $scope.getProjects()
    
    $scope.deleteProject = function (id) {
        manageProjSrvc.delete(id.id).then(function (response) {
            $scope.getProjects()
            });
        }

    $scope.getProjectStatus = function () {
        manageProjSrvc.getStatus().then(function (response) {
            $scope.statusoptions = response.data
            console.log($scope.statusoptions)
            });
    }

    $scope.getProjectStatus()

    $scope.getProjectType = function () {
        manageProjSrvc.getType().then(function (response) {
            $scope.typeoptions = response.data
            console.log($scope.typeoptions)
            });
    }

    $scope.getProjectType()

});