angular.module('fullstack').controller('manageListsCtrl', function($scope, user, manageProjSrvc, securityService, usersService, timesheetSrvc, ModalService) {
    
    $scope.getUserStatus = () => { usersService.getStatus().then(function (response) { $scope.userStatus = response.data })}
    $scope.getUserStatus()
    
    
    $scope.getUserGroup = () => { usersService.getUserGroup().then(function (response) { $scope.userGroup = response.data })}
    $scope.getUserGroup()
    

    $scope.getSecurityGroup = () => { securityService.getSecurityGroup().then(function (response) { $scope.securityGroups = response.data})}
    $scope.getSecurityGroup()


    $scope.getProjectType = () => { manageProjSrvc.getType().then(function (response) { $scope.projectTypeOptions = response.data })}
    $scope.getProjectType()


    $scope.getProjectTasks = () => { timesheetSrvc.getProjectTasks().then(function (response) { $scope.projectTasks = response });}
    $scope.getProjectTasks()

    
    $scope.getProjectStatus = () => { manageProjSrvc.getStatus().then(function (response) {$scope.projectStatusOptions = response.data})}
    $scope.getProjectStatus()
    
    
    $scope.getProjectRole = () => { manageProjSrvc.getProjectRole().then(function (response) {$scope.projectRoleOptions = response.data})}
    $scope.getProjectRole()

    $scope.getUsers= () => { usersService.readAll().then(function (response) {$scope.allusers = response.data});    }
    $scope.getUsers()

});