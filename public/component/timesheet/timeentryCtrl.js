angular.module('fullstack')
    .controller('timeentryCtrl', function($scope, user, $http, timesheetSrvc, $stateParams, $state) {
    
console.log('Time Entry ID: ', $stateParams.id)

    $scope.getTimeSheetEntry = function (id) {
        timesheetSrvc.getTimeSheetEntry(id).then(function (response) {
            $scope.timeEntry = response
            //In JSON, date in a string, apparently, so convert back to date
            $scope.timeEntry.taskdate = new Date($scope.timeEntry.taskdate)
            console.log(response)
           });
    }
    
    $scope.getTimeSheetEntry($stateParams.id);


    $scope.cancel = function() {
        $state.go('timesheet');
    }


    console.log('This Sunday Is: ', moment().startOf('week').format('MM/DD'));

    // Load Data for Dropdowns
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

    $scope.deleteTimeEntry = function (id) {
        timesheetSrvc.deleteTimeEntry(id.id).then(function (response) {
            $state.go("timesheet");
            });
        }   
});
    