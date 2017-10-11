angular.module('fullstack').controller('timesheetCtrl', function($scope, user, timesheetSrvc, usersService, $stateParams) {
    
    // Limits date picker to only sundays          
    $scope.dataPickerFilter = timesheetSrvc.onlyPickSunday

    // let weekStartDate = getMonday(new Date())
    $scope.startDate = timesheetSrvc.getSunday(new Date())
    
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

    console.log('Time Entry Data Is:');
    console.log($scope.entry)

   
    // $scope.userlist = {userid: 100, username: "Test Name"}
    // console.log($scope.userlist)
    // console.log('user list is:');
    // console.log($scope.userlist)
    
    
    // Sets initial value in ng-option to currently logged in user
    $scope.userFilter = user.userid
  
   $scope.apidata = {
        id: $scope.userFilter,
        week: $scope.startDate.toISOString().slice(0, 10)
    }

    
    timesheet = function () {
        timesheetSrvc.getTimesheet($scope.apidata).then(function (response) {
            // console.log(response)
            $scope.timesheet = response
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

    $scope.deleteaddTimeEntry = function (id) {
        console.log('data for deleting time entry api');
        console.log(id)
        timesheetSrvc.deleteaddTimeEntry(id.id).then(function (response) {
            console.log(response)
            timesheet()  // reload the table after deleting row
        });
    }


    //Initial loading of timesheet

    $scope.$watch('[startDate,userFilter]', function(newValue, oldValue){  
        // The timesheet isn't updating when the calendar changes
        // so forcing it here:
        $scope.apidata = {
            id: $scope.userFilter,
            week: $scope.startDate.toISOString().slice(0, 10)
        }
        // console.log( $scope.apidata)
        
        timesheet()
        
     });

   


});