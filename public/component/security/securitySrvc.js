angular.module('fullstack').service('securityService', function($http) {
    
    var self = this;

    self.getSecurityGroup = function (id) {
        return $http({
            method: 'GET',
            url: '/api/usersecuritygroup'
        });
    };

    self.getPermissions = function (id) {
        return $http({
            method: 'GET',
            url: '/api/userpermission'
        });
    };

    self.updatePermissions = function (id, data) {
        console.log(data)
        return $http({
            method: 'PUT',
            url: '/api/userpermission/?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
        });
    };
})
   