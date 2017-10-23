angular.module('fullstack').controller('reportsCtrl', function($scope, $sce, $http, user, reportService, usersService, manageProjSrvc, $timeout) {

    $scope.startDate =moment().subtract(4, 'weeks').add(0,'days').format("YYYY-MM-DD");
    $scope.endDate = moment().startOf('week').add(0,'days').format("YYYY-MM-DD");
    
    //$scope.groupid = 2;

    $scope.showgroup = usersService.getUserGroup().then(function (response) { $scope.userGroup = response.data;})
    
    $scope.getWeeklyData = function (startDate, endDate, group) {
        if (typeof group == "undefined" || group == null) {
            group = -1  // the stored procedure in mysql uses -1 for all groups
        }

        reportService.getWeeklyTotalHours(startDate, endDate, group)
            .then(function (response) {
                dbData = response[0][0]   // this returns an object with the data I need
                console.log('Data from Database')
                console.log(dbData)
                // but for the report to work, it needs to be in an array
                let lineChartLabels = [];
                let lineChartData = [];
                let lineChartSeries = [];
                
                //Build array with usernames
                for (let i=0; i<dbData.length; i++) {
                    lineChartSeries.push(dbData[i].userfullname);
                }
                    
                // look at the first element on the object to get the dates
                for (var key in dbData[0]) {
                    lineChartLabels.push(key.substring(5));
                }
             
                //remove the first element in the new array since it's a name not a date
                lineChartLabels.shift()

                
                var keys = Object.keys(dbData[0]);
                

                for (var i = 0; i < dbData.length; i++) {
                    var result = [];
                    for (var j = 0, len = keys.length; j < len; j++) {
                        result.push(dbData [i]  [keys[j]]   );
                    }
                    result.shift()  //remove the name

                    lineChartData.push(result)
                }
    
                // X Axis Labels   (Week)
                $scope.labels = lineChartLabels 
 
                // User Names
                $scope.series = lineChartSeries
    
                //Total Hours
                $scope.data =   lineChartData

                $scope.onClick = function (points, evt) {
                console.log(points, evt);
                };
    
                $scope.options = {
                    legend: {display: true},
                    scales: {
                        showLine: [{ display: true }],
                        yAxes:  [
                                    {
                                        id: 'y-axis-1',
                                        type: 'linear',
                                        display: true,
                                        position: 'left'
                                    }
                                ]
                    }   
                };

            })
    };

    $scope.getWeeklyData($scope.startDate, $scope.endDate, $scope.groupid);



// Create Invoice PDF

$scope.allprojects = manageProjSrvc.readAll().then(function (response) { $scope.allprojects = response.data; console.log($scope.allprojects) });




$scope.showReportOnScreen = function () {
    var parameter = { "template": { "shortid": "rkJTnK2ce" }};
    reportService.showReportOnScreen(parameter).then(function (result) {
        var file = new Blob([result.data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
    $scope.content = $sce.trustAsResourceUrl(fileURL);
    });
}



$scope.getInvoiceHours = (startDate, endDate, group) => { 
    reportService.getInvoiceHours(startDate, endDate, group)
        .then(function (response) { 
            console.log(response);
            dbData = response; 
            
            var data = {
                template: {'shortid':'HywaskipW'},
                data: {
                    "number": "123456789",
                    "seller": {
                        "name": "Dev Class Inc.",
                        "road": "500 S. Ervay St.",
                        "country": "Dallas, TX 75201"
                    },
                    "buyer": {
                        "name": "Google",
                        "road": "1600 Amphitheatre Parkway",
                        "country": "Mountain View, CA 94043"
                    },
                    "items": dbData
                } 
            }

            console.log(data)

            $http({
                method: 'POST',
                url: 'http://localhost:8001/api/report',
                data: data,
                responseType: 'arraybuffer'
            }).success(function (data, status, headers) {
                headers = headers();
         
                var filename = 'Invoice#' //headers['x-filename'];
                var contentType = headers['content-type'];
         
                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);
         
                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);
         
                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            
            })
            
            .error(function (data) {
                console.log(data);
            });
         
        });
    }



$scope.downloadFile = function () {

    var data = {
        template: {'shortid':'rkJTnK2ce'},
        data: {
            "number": "123456789",
            "seller": {
                "name": "Dev Class Inc.",
                "road": "500 S. Ervay St.",
                "country": "Dallas, TX 75201"
            },
            "buyer": {
                "name": "Google",
                "road": "1600 Amphitheatre Parkway",
                "country": "Mountain View, CA 94043"
            },
            "items": [{
                "name": "Website design",
                "price": 300
            },
            {
                "name": "Another Thing",
                "price": 500
            },
            {
                "name": "This Works!",
                "price": .01
            },
            {
                "name": "This Works!",
                "price": .01
            },
            {
                "name": "Apples",
                "price": 5.00
            }
            ]   
        } //,
        //options: {
        //    preview:true
        //}
    }


    $http({
        method: 'POST',
        url: 'http://localhost:8001/api/report',
        data: data,
        responseType: 'arraybuffer'
    }).success(function (data, status, headers) {
        headers = headers();
 
        var filename = 'Invoice#' //headers['x-filename'];
        var contentType = headers['content-type'];
 
        var linkElement = document.createElement('a');
        try {
            var blob = new Blob([data], { type: contentType });
            var url = window.URL.createObjectURL(blob);
 
            linkElement.setAttribute('href', url);
            linkElement.setAttribute("download", filename);
 
            var clickEvent = new MouseEvent("click", {
                "view": window,
                "bubbles": true,
                "cancelable": false
            });
            linkElement.dispatchEvent(clickEvent);
        } catch (ex) {
            console.log(ex);
        }
    
    })
    
    .error(function (data) {
        console.log(data);
    });
};



})

