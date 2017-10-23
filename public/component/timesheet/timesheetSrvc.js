angular.module('fullstack').service('timesheetSrvc', function($http) {
    
    var self = this;
    var baseUrl = '/api/timesheet?id=';
    
    self.getTimesheet = function (data) {
        return $http({
            method: 'GET',
            url: baseUrl + data.id + '&week=' +data.week, 
        }).then(function (response) {
            return response.data;
        });
    };
 
    self.getOpenProjects = function (data) {
        return $http({
            method: 'GET',
            url: '/api/projects?status_id=1', 
        }).then(function (response) {
            return response.data;
        });
    };

    self.getProjectTasks = function (data) {
        return $http({
            method: 'GET',
            url: '/api/projecttask', 
        }).then(function (response) {
            return response.data;
        });
    };

    self.addTimeEntry = function (data) {
        return $http({
            method: 'POST',
            url: '/api/timeentry',
            data: data,
            params: {
                returnObject: true
            }
        }).then(function (response) {
            return response.data;
        });
    };

    self.deleteTimeEntry = function (id) {
        return $http({
            method: 'DELETE',
            url: '/api/timeentry' + '/?id=' + id
        });
    };

    self.getTimeSheetEntry = function (id) {
        return $http({
            method: 'GET',
            url: '/api/timeentry' + '/?id=' + id
        }).then(function (response) {
            return response.data.data;
        });
    };

    self.updateTimeSheetEntry = function (id, data) {
        return $http({
            method: 'PUT',
            url: '/api/timeentry' + '?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
        }).catch(function (err)  {
            console.log(err)
        });
    };

    
    self.getTimeSheetEntries = function (data) {
        console.log(data)
        return $http({
            method: 'GET',
            url: '/api/timeentries' + '/?id=' + data.id + '&start=' + data.start + '&end=' + data.end
        }).then(function (response) {
            return response;
        });
    };


    
    
    
    
    })
    
    