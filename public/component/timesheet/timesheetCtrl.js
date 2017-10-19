angular.module('fullstack').controller('timesheetCtrl', function($scope, user, timesheetSrvc, usersService, $stateParams, ModalService) {
    
// SET DEFAULTS FOR PAGE LOAD 

    // Sets initial week to the first day of this week.
    $scope.startDate = moment().startOf('week')._d
    
    // Sets initial entry date to today
    // console.log('setting entryDate')
    $scope.entryDate  = moment().startOf('day')._d
    
    // Sets initial value in ng-option to currently logged in user
    $scope.userFilter = user.id

    $scope.userfullname = user.firstname + ' ' + user.lastname
    $scope.user = user

// LOAD DATA FOR OPTION DROP DOWNS

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
            // console.log($scope.openProjects)
            });
    }
    $scope.getOpenProjects()


    $scope.getProjectTasks = function () {
        timesheetSrvc.getProjectTasks().then(function (response) {
            $scope.projectTasks = response

            });
    }
    $scope.getProjectTasks()




    // Decrement or Increment Time Entry Day
    $scope.incrementDate = function () {
         $scope.entryDate = moment($scope.entryDate).add(1, 'days').format('MM/DD/YYYY')
         console.log ($scope.entryDate)

        // If we increment into the next week, change the timesheet startDate too
        let timeEntryWeek = moment(moment($scope.entryDate).toDate()).startOf('week')._d
        
        // the stuff inside 'isSame' is takinc entryDate, converting it to a date, and then finding 1st day
        if (!moment($scope.startDate).isSame(moment(moment($scope.entryDate).toDate()).startOf('week')._d)) {
            // console.log('weeks are not the same')
            $scope.startDate = timeEntryWeek
        } 
    }

    $scope.decrementDate = function () {
        
        $scope.entryDate = moment($scope.entryDate).add(-1, 'days').format('MM/DD/YYYY')
        console.log ($scope.entryDate)

        //If we decrement into the next week, change the timesheet startDate too
        let timeEntryWeek = moment(moment($scope.entryDate).toDate()).startOf('week').format('MM/DD/YYYY')
  
        // // the stuff inside 'isSame' is takinc entryDate, converting it to a date, and then finding 1st day
        if (!moment($scope.startDate).isSame(moment(moment($scope.entryDate).toDate()).startOf('week')._d)) {
            // console.log('weeks are not the same')
            $scope.startDate = timeEntryWeek
        } 
    }

    $scope.incrementWeek = function () {
        $scope.startDate = moment($scope.startDate).add(7, 'days').format('MM/DD/YYYY')
        console.log ($scope.startDate)

       // If we increment into the next week, change the timesheet startDate too
    //    let timeEntryWeek = moment(moment($scope.startDate).toDate()).startOf('week')._d
       
    //    // the stuff inside 'isSame' is takinc startDate, converting it to a date, and then finding 1st day
    //    if (!moment($scope.startDate).isSame(moment(moment($scope.startDate).toDate()).startOf('week')._d)) {
    //        console.log('weeks are not the same')
    //        $scope.startDate = timeEntryWeek
    //    } 
   }

   $scope.decrementWeek = function () {
       
       $scope.startDate = moment($scope.startDate).add(-7, 'days').format('MM/DD/YYYY')
       console.log ($scope.startDate)

    //    //If we decrement into the next week, change the timesheet startDate too
    //    let timeEntryWeek = moment(moment($scope.startDate).toDate()).startOf('week').format('MM/DD/YYYY')
 
    //    // // the stuff inside 'isSame' is takinc startDate, converting it to a date, and then finding 1st day
    //    if (!moment($scope.startDate).isSame(moment(moment($scope.startDate).toDate()).startOf('week')._d)) {
    //        console.log('weeks are not the same')
    //        $scope.startDate = timeEntryWeek
    //    } 
   }


      
    // Pull all the data to populate timesheer
    timesheet = function () {
        $scope.apidata = {
            id: $scope.userFilter,
            week: moment($scope.startDate).format('YYYY-MM-DD')
        }
        
        // console.log('timesheet api data is:')
        // console.log($scope.apidata);
        
        timesheetSrvc.getTimesheet($scope.apidata).then(function (response) {
            // console.log('Timesheet Data:');
            // console.log(response)
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
            
            $scope.dateFooter = {sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0};
            
            angular.forEach($scope.timesheet,function(value){
                $scope.dateFooter.sun += value.sun;
                $scope.dateFooter.mon += value.mon;
                $scope.dateFooter.tue += value.tue;
                $scope.dateFooter.wed += value.wed;
                $scope.dateFooter.thu += value.thu;
                $scope.dateFooter.fri += value.fri;
                $scope.dateFooter.sat += value.sat;
            });

            $scope.weekTotal = $scope.dateFooter.sun + $scope.dateFooter.mon + $scope.dateFooter.tue
                             + $scope.dateFooter.wed + $scope.dateFooter.thu + $scope.dateFooter.fri 
                             + $scope.dateFooter.sat
            
                            
        
        
        });

        
    }
    
    //Initial loading of timesheet
    timesheet()
    
    
    $scope.addTimeEntry = function (data) {
        // Date picker puts the date in a string format of MM/DD/YYYY
        // Rearranging it to YYYY/MM/DD for sql query
        let sqlDate = $scope.entryDate.toString().split("/")
        sqlDate = (sqlDate[2] + '-' + sqlDate[0] + '-' + sqlDate[1])
        
        data.user_id = $scope.userFilter
        console.log('Entry Date is:')
        console.log(sqlDate)

        data.taskdate = sqlDate
        
        timesheetSrvc.addTimeEntry(data).then(function (response) {
            timesheet()  // reload the table after adding new row
        });
    }



    $scope.copyLastWeek = function () {
        $scope.userLastWeek = {
            id: $scope.userFilter,
            start: moment($scope.startDate).add(-1, 'weeks').format('YYYY-MM-DD'),
            end: moment($scope.startDate).add(-1, 'days').format('YYYY-MM-DD')
        }

        timesheetSrvc.getTimeSheetEntries($scope.userLastWeek)
            .then(function (response) {
                return response.data.data
            })  //get the time sheet data from previous week and return it below to re-enter it

            .then(function (lastWeekData) {
                delete lastWeekData.timeentryid  
                for (i=0; i<lastWeekData.length; i++) {
                    delete lastWeekData[i].timeentryid    //delete key value from copy row
                    lastWeekData[i].taskdate = moment(lastWeekData[i].taskdate).add(7, 'days').format('YYYY-MM-DD')
                    timesheetSrvc
                        .addTimeEntry(lastWeekData[i])
                        .then(function (response) {
                            // console.log(lastWeekData[0])
                            // console.log(response)  
                        })
                        .then(function () {
                            timesheet()
                        })  
                }
            })
            // .then(function () {
            //     timesheet()
            // })
    }




    // $scope.deleteTimeEntry = function (id) {
    //     timesheetSrvc.deleteTimeEntry(id.id).then(function (response) {
    //         timesheet()  // reload the table after deleting row
    //     });
    // }



// Delete will pop open a modal asking you to confirm
$scope.deleteTimeEntry = function(timeentry) {
    
    console.log(timeentry)
    $scope.modalData = timeentry.entry
    console.log($scope.modalData)
    console.log($scope.modalData.projectname)
      
    ModalService.showModal({
        templateUrl: "/component/modal/confirmdelete.html",
        controller: "modalController",
        inputs: { modalData: $scope.modalData,
                  message: 'Are you sure you want to horus for project ' + $scope.modalData.projectname + ' and task ' + $scope.modalData.task + '?' },
        preClose: (modal) => { modal.element.modal('hide'); }
    })

    .then(function(modal) {
        modal.element.modal();
        modal.close
            .then(function(result) {  
                if(result) {   
                    timesheetSrvc.deleteTimeEntry( $scope.modalData.timeentryid).then(function (response) {
                        timesheet();
                        });
                }
            })
        })
};







    $scope.$watch('[startDate,userFilter]', function(newValue, oldValue){  
        // The timesheet isn't updating when the calendar changes
        // so forcing it here:
        $scope.apidata = {
            id: $scope.userFilter,
            week: moment($scope.startDate).format('YYYY-MM-DD')
        }    
        timesheet()
        
        // $scope.entryDate =  moment($scope.startDate).format('YYYY-MM-DD')

        //     console.log('entry date is:')
        //     console.log($scope.entrydate)
       

     });
     
   
     
   
     
     
});
    
    
    
    //     angular.element(document).ready(function(){
    //     //     $('#timesheettable').DataTable( {
    //     //         "ordering": false,
    //     //         "searching": false
    //     //     } )
    
    
    
    //         var timesheettable = $('#timesheettable').dataTable( {
    //             "autoWidth": true,
                
    //             "aaData": $scope.timesheet,
                
    //             "footerCallback": function(row, data, start, end, display) {
    //                 var api = this.api();
                   
    //                 api.columns('.sum', {
    //                   page: 'current'
    //                 }).every(function() {
    //                   var sum = this
    //                     .data()
    //                     .reduce(function(a, b) {
    //                       var x = parseFloat(a) || 0;
    //                       var y = parseFloat(b) || 0;
    //                       return x + y;
    //                     }, 0);
    //                   console.log(sum); //alert(sum);
    //                   $(this.footer()).html(sum);
    //                 });
    //               },
    
    //             "aoColumns": [
    //                 { "mDataProp": "projectname" },
    //                 { "mDataProp": "task" },
    //                 { "mDataProp": "sun" },
    //                 { "mDataProp": "mon" },
    //                 { "mDataProp": "tue" },
    //                 { "mDataProp": "wed" },
    //                 { "mDataProp": "thu" },
    //                 { "mDataProp": "fri" },
    //                 { "mDataProp": "sat" }
    //             ]
    
    
    //           } );
    
    
    
    //           //highlight selected column
    //           $('td',timesheettable.fnGetNodes()).hover( function() {
    //             var iCol = $('td').index(this) % 9;
    //             var nTrs = timesheettable.fnGetNodes();
    //             $('td:nth-child('+(iCol+1)+')', nTrs).addClass( 'highlighted' );
    //         }, function() {
    //             $('td.highlighted', timesheettable.fnGetNodes()).removeClass('highlighted');
    //         } );
    
    
    
              
    // })