angular.module('fullstack').service('reportService', function($http) {
    
    var self = this;
    var baseUrl = 'http://192.168.2.8:5488/api/report';





    self.getUserReport = function (data) {
        console.log(data)
        return $http({
            method: 'POST',
            url: baseUrl,
            data: data,
            headers: { 'Content-Type': 'application/json; charset=UTF-8'}
            // params: {
            //     returnObject: true
            // }
        }).then(function (response) {
            return response.data;
        });
    };


    self.try = function (data) {
        
        return $http({
            method: 'POST',
            url: 'http://192.168.2.8:5488/api/report',
            headers: { // this is were you should look into
                'Content-Type' : 'application/json'
            },
            body: { 
                "template": { "shortid" : "S1i9Nh-6W" }
            }
            
            //json: true 

        }).then(function (response) {
                return response;
            })
            .catch(function (response) {
                return response;
            });
        };




        self.list = function (data) {
            
            return $http({
                method: 'GET',
                url: 'http://192.168.2.8:5488/odata/$metadata'
    
    
            }).then(function (response) {
                    console.log(response)
                    return response;
                })
                .catch(function (response) {
                    console.log(response)
                    return response;
                });
            };

})
   