angular.module('fullstack').controller('reportsCtrl', function($scope, user, reportService) {
    
    $scope.reportsTest = "Test of Reports"

    console.log('Username from reports Controller')
    console.log(user);

let body = {
	"template":
	
		{
			"shortid":"S1i9Nh-6W"
			
		}
	
};


var datajson = {
    template:{'shortid':'S1i9Nh-6W'},
   }

    $scope.try = function () {
        reportService.try().then(function (response) {
            $scope.userReport = response
            console.log(response)
            });
    }

    $scope.try()

    $scope.list = function () {
        reportService.list().then(function (response) {
            // $scope.userReport = response
            console.log(response)
            });
    }

    $scope.list()


    
    //   rq(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     console.dir(body);
    //     fs.writeFile(path.join(config.outFolder, 'badges.pdf'), body, 'binary', (err) => {
    //        if(err) log.error(err);
    //        log.info('Successfully Wrote Badge Sheet.');
    //      });
    //   });










        
        
    



    
});