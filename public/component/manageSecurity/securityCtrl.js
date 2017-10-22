angular.module('fullstack').controller('securityCtrl', function($scope, user, securityService) {
    
    $scope.securityTest = "Test of Security Controller" 
        
    $scope.getSecurityGroup = function () {
        securityService.getSecurityGroup().then(function (response) {
            console.log(response.data)
            $scope.securityGroups = response.data
            });
    }
    
    $scope.getSecurityGroup()

      

    $scope.updatePermissions = function (data) {
        //build body for API call
        let body = {}
        body[data.column] = data.value;
        console.log(data.id)
        console.log(body)
             
        securityService.updatePermissions(data.id, body).then(function (response) {
            $scope.getSecurityGroup()   //refresh screen
            });
    }
    



    
});