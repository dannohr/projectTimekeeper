angular.module('fullstack').service('manageProjSrvc', function($http) {
    
    var self = this;
    var baseUrl = '/api/projects';
    
    self.readAll = function () {
        return $http({
            method: 'GET',
            url: baseUrl 
        }).then(function (response) {
            return response.data;
        });
    };
    
    self.readOne = function (id) {
        return $http({
            method: 'GET',
            url: baseUrl + '/?id=' + id
        }).then(function (response) {
            return response.data;
        });
    };
    
    self.create = function (data) {
        console.log(data)
        return $http({
            method: 'POST',
            url: baseUrl,
            data: data,
            params: {
                returnObject: true
            }
        }).then(function (response) {
            return response.data;
        });
    };
    
    self.update = function (id, data) {
        return $http({
            method: 'PUT',
            url: baseUrl + '?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
        });
    };
    
    self.delete = function (id) {
        return $http({
            method: 'DELETE',
            url: baseUrl + '/?id=' + id
        });
    };
    
    self.getStatus = function (id) {
        return $http({
            method: 'GET',
            url: '/api/projectStatus'
        });
    };

    self.getType = function (id) {
        return $http({
            method: 'GET',
            url: '/api/projecttype'
        });
    };

    
    self.getProjectRole = function (id) {
        return $http({
            method: 'GET',
            url: '/api/projectrole'
        });
    };
    
    self.createProjectUser = function (data) {
        console.log(data)
        return $http({
            method: 'POST',
            url: '/api/projectuser',
            data: data   //,
            // params: {
            //     returnObject: true
            // }
        }).then(function (response) {
            return response.data;
        });
    };

    self.deleteProjectUser = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/projectuser/?id=' + id
        });
    };
    
    
    self.updateProjectUser = function (id, data) {
        return $http({
            method: 'PUT',
            url: '/api/projectuser/?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
        });
    };

    
    self.getProjectUser = function (id) {
        return $http({
            method: 'GET',
            url: '/api/projectuser/?id=' + id
        }).then(function (response) {
            return response.data;
        });
    };



    
    })
    
    