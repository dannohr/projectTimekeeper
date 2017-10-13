angular.module('fullstack').controller('timesheetCtrl', function($scope, user, timesheetSrvc, usersService, $stateParams) {
    
    // Limits date picker to only sundays          
    

    // $scope.startDate  = timesheetSrvc.getSunday(new Date())
    $scope.startDate = moment().startOf('week')._d
    // $scope.entrydate = moment().startOf('week')._d

    console.log($scope.entrydate)

    // Decrement or Increment Time Entry Day
    $scope.incrementDate = function () {
         $scope.entrydate = moment($scope.entrydate).add(1, 'days').format('MM/DD/YYYY')
         console.log ($scope.entrydate)

        // If we increment into the next week, change the timesheet startDate too
        let timeEntryWeek = moment(moment($scope.entrydate).toDate()).startOf('week')._d
        
        // the stuff inside 'isSame' is takinc entryDate, converting it to a date, and then finding 1st day
        if (!moment($scope.startDate).isSame(moment(moment($scope.entrydate).toDate()).startOf('week')._d)) {
            console.log('weeks are not the same')
            $scope.startDate = timeEntryWeek
        } 
        

    }

    $scope.decrementDate = function () {
        
        $scope.entrydate = moment($scope.entrydate).add(-1, 'days').format('MM/DD/YYYY')
        console.log ($scope.entrydate)

        //If we decrement into the next week, change the timesheet startDate too
        let timeEntryWeek = moment(moment($scope.entrydate).toDate()).startOf('week')._d
  
        // // the stuff inside 'isSame' is takinc entryDate, converting it to a date, and then finding 1st day
        if (!moment($scope.startDate).isSame(moment(moment($scope.entrydate).toDate()).startOf('week')._d)) {
            console.log('weeks are not the same')
            console.log($scope.startDate)
            console.log(timeEntryWeek)
            $scope.startDate = timeEntryWeek
        } 
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
        console.log('timesheet api data is:')
        console.log($scope.apidata);
        
        timesheetSrvc.getTimesheet($scope.apidata).then(function (response) {
            console.log('Timesheet Data:');
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
        let sqlDate = $scope.entrydate.toString().split("/")
        sqlDate = (sqlDate[2] + '-' + sqlDate[0] + '-' + sqlDate[1])
        
        data.userid = $scope.userFilter
        data.taskdate = sqlDate
        
        timesheetSrvc.addTimeEntry(data).then(function (response) {
            timesheet()  // reload the table after adding new row
        });
    }

    $scope.deleteTimeEntry = function (id) {
        timesheetSrvc.deleteTimeEntry(id.id).then(function (response) {
            timesheet()  // reload the table after deleting row
        });
    }

  

    $scope.$watch('[startDate,userFilter]', function(newValue, oldValue){  
        // The timesheet isn't updating when the calendar changes
        // so forcing it here:
     
        // Date picker puts the date in a string format of MM/DD/YYYY
        // Rearranging it to YYYY/MM/DD for sql query
        let sqlDate = $scope.startDate.toString().split("/")
        sqlDate = (sqlDate[2] + '-' + sqlDate[0] + '-' + sqlDate[1])
        
        $scope.apidata = {
            id: $scope.userFilter,
            week: sqlDate  
        }
              
        timesheet()
        
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