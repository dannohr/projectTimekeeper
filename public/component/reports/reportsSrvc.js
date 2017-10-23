angular.module('fullstack').service('reportService', function($http) {
    
    var self = this;
    
    self.getWeeklyTotalHours = function (startDate, endDate, group) {
        startDate = moment(moment(startDate).toDate()).format("YYYY-MM-DD")
        endDate   = moment(moment(endDate).toDate()).format("YYYY-MM-DD")
        
        return $http({
            method: 'GET',
            url: '/api/reports/totalhours?start=\'' + startDate + '\'&end=\''+ endDate + '\'&group=\''+ group + '\'' 
        }).then(function (response) {
            return response.data;
        });
    };
    
    self.showReportOnScreen = function (parameter) {   //Shows report in screen
        var reportUrl = "http://localhost:8001/api/report";
        return $http.post(reportUrl, parameter, { responseType: 'arraybuffer' }).success(function (response) {
            return response;
        });
    };

    self.getInvoiceHours = function (startDate, endDate, project) {
        startDate = moment(moment(startDate).toDate()).format("YYYY-MM-DD")
        endDate   = moment(moment(endDate).toDate()).format("YYYY-MM-DD")
        
        return $http({
            method: 'GET',
            url: '/api/reports/invoicedata/?start=\'' + startDate + '\'&end=\''+ endDate + '\'&group=\''+ project + '\'' 
        }).then(function (response) {
            return response.data;
        });
    };

    
    



})
   