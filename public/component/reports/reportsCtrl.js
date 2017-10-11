angular.module('fullstack').controller('reportsCtrl', function($scope, user) {
    
    $scope.reportsTest = "Test of Reports"

    console.log('Username from reports Controller')
    console.log(user);
    
});