angular.module('fullstack').controller('timesheetCtrl', function($scope, user, timesheetSrvc, usersService, $stateParams) {
    
    // Limits date picker to only sundays          
    $scope.dataPickerFilter = timesheetSrvc.onlyPickSunday

    // $scope.startDate  = timesheetSrvc.getSunday(new Date())
    $scope.startDate  = moment().startOf('week')._d

    // Decrement or Increment Time Entry Day
    $scope.incrementDate = function () {
        $scope.entrydate = moment($scope.entrydate).add(1, 'days')._d
        console.log ($scope.entrydate)
    }
    $scope.decrementDate = function () {
        $scope.entrydate = moment($scope.entrydate).add(-1, 'days')._d
        console.log ($scope.entrydate)
    }


    // get list of users to populate ng-option
    $scope.getUsers = function () {
        usersService.readAll().then(function (response) {
            $scope.allusers = response.data

            });
    }
    
    $scope.getUsers()

    $scope.getOpenProjects = function () {
        timesheetSrvc.getOpenProjects().then(function (response) {
            $scope.openProjects = response.data

            });
    }
    $scope.getOpenProjects()

    $scope.getProjectTasks = function () {
        timesheetSrvc.getProjectTasks().then(function (response) {
            $scope.projectTasks = response

            });
    }
    $scope.getProjectTasks()
    
    // Sets initial value in ng-option to currently logged in user
    $scope.userFilter = user.userid
  
    // build req.body for get request to populate table
   $scope.apidata = {
        id: $scope.userFilter,
        week: $scope.startDate.toISOString().slice(0, 10)
    }

    
    timesheet = function () {
        timesheetSrvc.getTimesheet($scope.apidata).then(function (response) {
            console.log('Timesheet Date:');
            console.log(response)
            $scope.timesheet = response
            
            $scope.dateHeader = {
                sun: moment($scope.startDate).startOf('week').format('MM/DD'),
                mon: moment($scope.startDate).add(1, 'days').format('MM/DD'),
                tue: moment($scope.startDate).add(2, 'days').format('MM/DD'),
                wed: moment($scope.startDate).add(3, 'days').format('MM/DD'),
                thu: moment($scope.startDate).add(4, 'days').format('MM/DD'),
                fri: moment($scope.startDate).add(5, 'days').format('MM/DD'),
                sat: moment($scope.startDate).add(6, 'days').format('MM/DD')
            };
            
            $scope.dateFooter = {
                sun: 0,
                mon: 0,
                tue: 0,
                wed: 0,
                thu: 0,
                fri: 0,
                sat: 0
              };
              
              angular.forEach($scope.timesheet,function(value){
                $scope.dateFooter.sun += value.sun;
                $scope.dateFooter.mon += value.mon;
                $scope.dateFooter.tue += value.tue;
                $scope.dateFooter.wed += value.wed;
                $scope.dateFooter.thu += value.thu;
                $scope.dateFooter.fri += value.fri;
                $scope.dateFooter.sat += value.sat;
              });
    
              console.log($scope.dateFooter)
        
        });


    }
    
    timesheet()

    $scope.addTimeEntry = function (data) {
        data.userid = $scope.userFilter
        data.taskdate = $scope.entrydate.toISOString().slice(0, 10)
        timesheetSrvc.addTimeEntry(data).then(function (response) {
            timesheet()  // reload the table after adding new row
        });
    }

    $scope.deleteTimeEntry = function (id) {
        timesheetSrvc.deleteTimeEntry(id.id).then(function (response) {
            timesheet()  // reload the table after deleting row
        });
    }


//    function sumColumnHours() {
//        var total = 0;
//        for (i=0; i <  $scope.timesheet.length; i++) {
//            if ($scope.timesheet.mon) {
//                 total += $scope.timesheet.mon[i]
//            }
//        }
//        console.log('Total is: ', total)
//    }



    $scope.getTotal = function(){
        $scope.totalHoursFooter = {
            sun: 1,
            mon: 1,
            tue: 1,
            wed: 1,
            thu: 1,
            fri: 1,
            sat: 1 
        }
        
        var total = 0;
        for(var i = 0; i < $scope.cart.products.length; i++){
            var product = $scope.cart.products[i];
            total += (product.price * product.quantity);
        }
        return total;
    }





    $scope.$watch('[startDate,userFilter]', function(newValue, oldValue){  
        // The timesheet isn't updating when the calendar changes
        // so forcing it here:
        $scope.apidata = {
            id: $scope.userFilter,
            week: $scope.startDate.toISOString().slice(0, 10)
        }
        // console.log( $scope.apidata)

        $scope.entrydate = $scope.startDate
        
        timesheet()
        
     });

   

   


});