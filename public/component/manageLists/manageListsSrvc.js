angular.module('fullstack').service('manageListsSrvc', function($http) {
    
    var self = this;
    var baseUrl = '/api/projects';
    

    // This is used for all delete on Manage Lists page, 'table' come from the NG-CLICK in HTML
    self.deleteListItem = function (id, table) {
        return $http({
            method: 'DELETE',
            url: '/api/' + table + '/?id=' + id
        });
    };


    self.addListItem = function (api, data) {
        return $http({
            method: 'POST',
            url: '/api/' + api,
            data: data,
            params: {
                returnObject: true
            }
        }).then(function (response) {
            return response.data;
        });
    };

   
    self.updateListItem = function (id, api, data) {
        return $http({
            method: 'PUT',
            url: '/api/' + api + '/?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
        });
    };
    



    
    })
    
    