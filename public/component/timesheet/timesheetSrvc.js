angular.module('fullstack').service('timesheetSrvc', function($http) {
    
    var self = this;
    var baseUrl = '/api/timesheet?id=';
    
    // enter any date and get the sunday of that week
    // self.getSunday = function(date) {
    //     var day = date.getDay() || 7;  
    //     if( day !== 0 ) 
    //         date.setHours(-24 * (day - 0)); 
    //     return date;
    // }

    // make it so that calendar date picker only picks sundays
    // self.onlyPickSunday = function(date) {
    //     var day = date.getDay();
    //     return day === 0;
    //     }

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
            url: '/api/projtask', 
        }).then(function (response) {
            return response.data;
        });
    };

    self.addTimeEntry = function (data) {
        console.log('data passing to create entry API');
        console.log(data)
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
        console.log('From Service')
        console.log(data)
        return $http({
            method: 'PUT',
            url: '/api/timeentry' + '?id=' + id,
            data: data
        }).then(function (response) {
            return response.data;
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


    // console.log('data passing to API');
    // console.log(data)

    // self.readOne = function (id) {
    //     return $http({
    //         method: 'GET',
    //         url: baseUrl + '/?id=' + id
    //     }).then(function (response) {
    //         return response.data;
    //     });
    // };
    
    // self.create = function (data) {
    //     console.log(data)
    //     return $http({
    //         method: 'POST',
    //         url: baseUrl,
    //         data: data,
    //         params: {
    //             returnObject: true
    //         }
    //     }).then(function (response) {
    //         return response.data;
    //     });
    // };
    
    // self.update = function (id, data) {
    //     return $http({
    //         method: 'PUT',
    //         url: baseUrl + '?id=' + id,
    //         data: data
    //     }).then(function (response) {
    //         return response.data;
    //     });
    // };
    
    // self.delete = function (id) {
    //     return $http({
    //         method: 'DELETE',
    //         url: baseUrl + '/?id=' + id
    //     });
    // };
    
    // self.getStatus = function (id) {
    //     return $http({
    //         method: 'GET',
    //         url: '/api/userstatus'
    //     });
    // };
    
    
    
    
    })
    
    