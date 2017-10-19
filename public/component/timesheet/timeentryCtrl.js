angular.module('fullstack')
    .controller('timeentryCtrl', function($scope, user, $http, timesheetSrvc, $stateParams, $state, ModalService) {
    
    $scope.getTimeSheetEntry = function (id) {
        timesheetSrvc.getTimeSheetEntry(id).then(function (response) {
            $scope.timeEntry = response
            //In JSON, date in a string, apparently, so convert back to date
            $scope.timeEntry.taskdate = new Date($scope.timeEntry.taskdate)
            // console.log("Time Entry is:")
            // console.log(response)
           });
    }
    
    $scope.getTimeSheetEntry($stateParams.id);


    $scope.cancel = function() {
        $state.go('timesheet');
    }


    // console.log('This Sunday Is: ', moment().startOf('week').format('MM/DD'));

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
  
    $scope.updateTimeSheetEntry = function(id) {
        // Date picker puts the date in a string format of MM/DD/YYYY
        // Rearranging it to YYYY/MM/DD for sql query
        let sqlDate = $scope.timeEntry.taskdate.toString().split("/")
        sqlDate = (sqlDate[2] + '-' + sqlDate[0] + '-' + sqlDate[1])
        
        $scope.entryForApi = {
           user_id: $scope.timeEntry.user_id,
           project_id: $scope.timeEntry.project_id,
           taskid: $scope.timeEntry.taskid,
           taskhours: $scope.timeEntry.taskhours,
           taskdate: sqlDate
           }

        timesheetSrvc.updateTimeSheetEntry(id.id, $scope.entryForApi)
            .then (function(response) {
            })

            .catch (function(err) {
                console.log(err)
            })

        $state.go('timesheet');  // go back to timesheet
   
    }

// Delete will pop open a modal asking you to confirm
$scope.deleteTimeEntry = function(timeentry) {
    
    console.log(timeentry)
    $scope.modalData = timeentry.timeEntry
    console.log($scope.modalData)
    console.log($scope.modalData.taskdate)
      
    ModalService.showModal({
        templateUrl: "/component/modal/confirmdelete.html",
        controller: "modalController",
        inputs: { modalData: $scope.modalData,
                  message: 'Are you sure you want to delete entry having ' + $scope.modalData.taskhours + ' hours on ' + $scope.modalData.taskdate + '?' },
        preClose: (modal) => { modal.element.modal('hide'); }
    })

    .then(function(modal) {
        modal.element.modal();
        modal.close
            .then(function(result) {  
                if(result) {   
                    timesheetSrvc.deleteTimeEntry( $scope.modalData.timeentryid).then(function (response) {
                        $state.go("timesheet");
                        });
                }
            })
        })
};


});
    