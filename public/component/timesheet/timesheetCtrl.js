angular.module('fullstack').controller('timesheetCtrl', function($scope, user, timesheetSrvc, usersService) {
    
    // Limits date picker to only sundays          
    $scope.dataPickerFilter = timesheetSrvc.onlyPickSunday

    // let weekStartDate = getMonday(new Date())
    $scope.startDate = timesheetSrvc.getSunday(new Date())
    
    // get list of users to populate ng-option
    $scope.getUsers = function () {
        usersService.readAll().then(function (response) {
            console.log('users from api are:');
            console.log(response.data)
            $scope.allusers = response.data

            });
    }
    
    $scope.getUsers()

    $scope.getOpenProjects = function () {
        timesheetSrvc.getOpenProjects().then(function (response) {
            console.log('open projects from api are:');
            console.log(response.data)
            $scope.openProjects = response.data

            });
    }

    $scope.getProjectTasks = function () {
        timesheetSrvc.getProjectTasks().then(function (response) {
            console.log('tasks from api are:');
            console.log(response.data)
            $scope.projectTasks = response.data

            });
    }
    
    
    $scope.getOpenProjects()

   
    $scope.userlist = {userid: 100, username: "Test Name"}
    console.log($scope.userlist)
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
            console.log(response)
            $scope.timesheet = response
            });
    }
    
    //Initial loading of timesheet
    timesheet()

    $scope.$watch('[startDate,userFilter]', function(newValue, oldValue){  
        // The timesheet isn't updating when the calendar changes
        // so forcing it here:
        $scope.apidata = {
            id: $scope.userFilter,
            week: $scope.startDate.toISOString().slice(0, 10)
        }
        console.log( $scope.apidata)
        
        timesheet()
        
     });

   


});