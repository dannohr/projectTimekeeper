angular.module('fullstack').controller('reportsCtrl', function($scope, user, reportService, $timeout) {


    $scope.getWeeklyData = function () {
     
        reportService.getWeeklyTotalHours()
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
                        // result[i].push(dbData [i]  [keys[j]]   );
                        result.push(dbData [i]  [keys[j]]   );
                    }
                    result.shift()  //remove the name

                    lineChartData.push(result)
                }
                
                console.log('result')
                console.log(result)
                console.log(lineChartData)




                // console.log('db[0]')
                // console.log(dbData[0])
                // // for (i=0; i<dbData.length; i++) {
                //     for (var value in dbData[1]) {
                //         // lineChartSeries.push(dbData[i]);
                //            lineChartSeries.push(dbData[value]);
                //     }

                //     var result = [];
                //     var keys = Object.keys(dbData);
                    
                //     for (var i = 0, len = keys.length; i < len; i++) {
                //         result.push(dbData[keys[i]]);
                //     }
                //     console.log('result')
                //     console.log(result)
                // // }
                // console.log('new array')
                // console.log(lineChartSeries)
              
                
                
                    
                    
                    //Pull week out of object and put into report data array as the first item
                    // labelData[i] = [moment(dbData[i].Week).format('MM/DD/YYYY')]
                    
                    //Delete the week from the original object
                    // delete dbData[i].Week
                    
                    //push the hours (what's left in the object) into the new array
                    // for (let userfullname in dbData[i]) {
                    
                    // console.log(lineChartLabels)
                    // $scope.lineChartLabels = lineChartLabels
                    // console.log($scope.lineChartLabels)


                    // for (let hours in dbData[i]) {
                    // lineChartData[i].push(dbData[i][hours]);
                    // }

                
                // console.log(labelData)
                // $scope.labelData = labelData
                // return(reportData)   




    // Sample Report
    
    // X Axis Labels   (Week)
    $scope.labels = lineChartLabels //["10/1", "10/7", "10/14", "10/21", "11/1", "11/7", "11/14"];
    // $scope.labels = $scope.lineChartLabels
    // User Names
    $scope.series = lineChartSeries //['Joe', 'Sam','Oscar','Pete','Jeff','Scott','Fred','Andrew','John','Brian','Cheryl'];
    
    //Total Hours
     $scope.data =   lineChartData // [
    //                     [95, 100, 95, 100, 95, 100, 95],
    //                     [90, 95, 90, 95, 90, 95, 90],
    //                     [28, 60, 40, 19, 86, 27, 80],
    //                     [28, 78, 40, 19, 86, 27, 70],
    //                     [28, 88, 40, 19, 86, 27, 60],
    //                     [28, 78, 40, 19, 86, 27, 50],
    //                     [28, 48, 40, 19, 86, 97, 40],
    //                     [28, 48, 40, 19, 86, 87, 30],
    //                     [28, 48, 40, 19, 86, 77, 20],
    //                     [28, 48, 40, 19, 86, 67, 10],
    //                     [28, 48, 40, 19, 86, 57, 10]
    //                 ];
    
    $scope.onClick = function (points, evt) {
      console.log(points, evt);
    };
    
    // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    
    $scope.options = {
        legend: {display: true},
      scales: {
        showLine: [{ display: true }],
        yAxes: [
          {
            id: 'y-axis-1',
            type: 'linear',
            display: true,
            position: 'left'
          }
        //   ,
        //   {
        //     id: 'y-axis-2',
        //     type: 'linear',
        //     display: true,
        //     position: 'right'
        //   }
        ]
      }
    };

})
};
    
$scope.getWeeklyData()
  
  // Simulate async data update
//   $timeout(function () {
//     $scope.data = [
//       [28, 48, 40, 19, 86, 27, 90],
//       [65, 59, 80, 81, 56, 55, 40]
//     ];
//   }, 3000);




  

})







            // .then(function(reportData) {
            //     angular.element(document).ready(function(){
            //         console.log(reportData)
            //         console.log(reportData.length)
            //         // create data set on our data
            //         var dataSet = anychart.data.mapAsTable(reportData);
            
            //         // map data for the first series, take x from the zero column and value from the first column of data set
            //         // for (i=1; i<reportData[0].length; i++) {  //column 0 is x axis label, so don't include it in the date
            //         //     let j = 1; 
            //         //     global['seriesData_' + j] = 1
            //         //      console.log(seriesData_1)
            //         // }
            //         // var seriesData_1 = dataSet.mapAs({'x': 0, 'value': 1});
            //         // var seriesData_2 = dataSet.mapAs({'x': 0, 'value': 2});
            //         // var seriesData_3 = dataSet.mapAs({'x': 0, 'value': 3});
            //         // var seriesData_4 = dataSet.mapAs({'x': 0, 'value': 4})
            //         // var seriesData_5 = dataSet.mapAs({'x': 0, 'value': 5})
            //         // var seriesData_6 = dataSet.mapAs({'x': 0, 'value': 6})
            //         // var seriesData_7 = dataSet.mapAs({'x': 0, 'value': 7})
            //         // var seriesData_8 = dataSet.mapAs({'x': 0, 'value': 8})
            //         // var seriesData_9 = dataSet.mapAs({'x': 0, 'value': 9})
            //         // var seriesData_10 = dataSet.mapAs({'x': 0, 'value': 10})
            //         // var seriesData_11 = dataSet.mapAs({'x': 0, 'value': 11})
            
            //         // create line chart
            //         chart = anychart.line(dataSet[0], dataSet[1], dataSet[2], dataSet[3], dataSet[4], dataSet[5]);
                    
            //         for (i=0; i<6; i++) {
            //             console.log(reportData[i])
            //             chart.getSeries(i).name(reportData[i][0]);
            //         }
            //         // chart.getSeries(0).name('New York');
            //         // chart.getSeries(1).name('San Francisco');
            //         // chart.getSeries(2).name('Los Angeles');
            
            //         // // turn on chart animation
            //         // chart.animation(true);
            
            //         // // set chart padding
            //         // chart.padding([10, 20, 5, 20]);
            
            //         // // turn on the crosshair
            //         // chart.crosshair()
            //         //         .enabled(true)
            //         //         .yLabel(false)
            //         //         .yStroke(null);
            
            //         // // set tooltip mode to point
            //         // chart.tooltip().positionMode('point');
            
            //         // set chart title text settings
            //         chart.title('Total Hours by Employee');
            
            //         // set yAxis title
            //         chart.yAxis().title('Total Hours');
            //         chart.xAxis().labels().padding(5);
            
            //         // // create first series with mapped data
            //         // var series_1 = chart.line(seriesData_1);
            //         // series_1.name('Someone Name');
            //         // series_1.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_1.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
                    
                    
            //         // // console.log('this is series one')
            //         // // console.log(series_1)
                    
                    
                    
                    
            //         // // create second series with mapped data
            //         // var series_2 = chart.line(seriesData_2);
            //         // series_2.name('Person 2');
            //         // series_2.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_2.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            
            //         // // create third series with mapped data
            //         // var series_3 = chart.line(seriesData_3);
            //         // series_3.name('Person 3');
            //         // series_3.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_3.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
                            
            //         // // create third series with mapped data
            //         // var series_4 = chart.line(seriesData_4);
            //         // series_4.name('Person 4');
            //         // series_4.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_4.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_5 = chart.line(seriesData_5);
            //         // series_5.name('Person 5');
            //         // series_5.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_5.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_6 = chart.line(seriesData_6);
            //         // series_6.name('Person 6');
            //         // series_6.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_6.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_7 = chart.line(seriesData_7);
            //         // series_7.name('Person 7');
            //         // series_7.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_7.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_8 = chart.line(seriesData_8);
            //         // series_8.name('Person 8');
            //         // series_8.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_8.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_9 = chart.line(seriesData_9);
            //         // series_9.name('Person 9');
            //         // series_9.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_9.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_10 = chart.line(seriesData_10);
            //         // series_10.name('Person 10');
            //         // series_10.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_10.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // create third series with mapped data
            //         // var series_11 = chart.line(seriesData_11);
            //         // series_11.name('Person 11');
            //         // series_11.hovered().markers()
            //         //         .enabled(true)
            //         //         .type('circle')
            //         //         .size(4);
            //         // series_11.tooltip()
            //         //         .position('right')
            //         //         .anchor('left-center')
            //         //         .offsetX(5)
            //         //         .offsetY(5);
            //         // // turn the legend on
            //         // chart.legend()
            //         //         .enabled(true)
            //         //         .fontSize(13)
            //         //         .padding([0, 0, 10, 0]);
            
            //         // set container id for the chart and set up paddings
            //         chart.container('UserTotalHoursByWeek');
            
            //         // initiate chart drawing
            //         chart.draw();
            
            
            //     });
                        
            // }) 
            

    //};

    //build report
    





    // function getData() {
    //     return [
    //         ['9/25/17',  8, 40, 40,24,25,23,25,41,25,41,12],
    //         ['10/02/17', 56,  5, 41,23,55,20,14,25,34,25,20],
    //         ['10/09/17', 56, 56, 38, 5,40,20,40,20,40,20,40],
    //         ['10/16/17',60, 56, 35, 5, 2,32,42,41,41,21,40],
    //         ['10/23/17',28, 56, 40,40,40,40,40,40,40,40,40],
    //         ['10/30/17',24, 51, 35,35,32,33,34,35,36,37,38],
    //         ['11/06/17', 24, 40, 42,42,40,40,42,41,39,28,35],
    //         ['11/13/17',20, 40, 40,40,40,40,40,40,40,40,40]
    //     ]
    // }

    // angular.element(document).ready(function(){
    //     // create data set on our data
    //     var dataSet = anychart.data.set(getData());

    //     // map data for the first series, take x from the zero column and value from the first column of data set
    //     var seriesData_1 = dataSet.mapAs({'x': 0, 'value': 1});
    //     var seriesData_2 = dataSet.mapAs({'x': 0, 'value': 2});
    //     var seriesData_3 = dataSet.mapAs({'x': 0, 'value': 3});
    //     var seriesData_4 = dataSet.mapAs({'x': 0, 'value': 4})
    //     var seriesData_5 = dataSet.mapAs({'x': 0, 'value': 5})
    //     var seriesData_6 = dataSet.mapAs({'x': 0, 'value': 6})
    //     var seriesData_7 = dataSet.mapAs({'x': 0, 'value': 7})
    //     var seriesData_8 = dataSet.mapAs({'x': 0, 'value': 8})
    //     var seriesData_9 = dataSet.mapAs({'x': 0, 'value': 9})
    //     var seriesData_10 = dataSet.mapAs({'x': 0, 'value': 10})
    //     var seriesData_11 = dataSet.mapAs({'x': 0, 'value': 11})

    //     // create line chart
    //     chart = anychart.line();

    //     // turn on chart animation
    //     chart.animation(true);

    //     // set chart padding
    //     chart.padding([10, 20, 5, 20]);

    //     // turn on the crosshair
    //     chart.crosshair()
    //             .enabled(true)
    //             .yLabel(false)
    //             .yStroke(null);

    //     // set tooltip mode to point
    //     chart.tooltip().positionMode('point');

    //     // set chart title text settings
    //     chart.title('Total Hours by Employee');

    //     // set yAxis title
    //     chart.yAxis().title('Total Hours');
    //     chart.xAxis().labels().padding(5);

    //     // create first series with mapped data
    //     var series_1 = chart.line(seriesData_1);
    //     series_1.name('Person 1');
    //     series_1.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_1.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);

    //     // create second series with mapped data
    //     var series_2 = chart.line(seriesData_2);
    //     series_2.name('Person 2');
    //     series_2.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_2.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);

    //     // create third series with mapped data
    //     var series_3 = chart.line(seriesData_3);
    //     series_3.name('Person 3');
    //     series_3.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_3.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
                
    //     // create third series with mapped data
    //     var series_4 = chart.line(seriesData_4);
    //     series_4.name('Person 4');
    //     series_4.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_4.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_5 = chart.line(seriesData_5);
    //     series_5.name('Person 5');
    //     series_5.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_5.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_6 = chart.line(seriesData_6);
    //     series_6.name('Person 6');
    //     series_6.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_6.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_7 = chart.line(seriesData_7);
    //     series_7.name('Person 7');
    //     series_7.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_7.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_8 = chart.line(seriesData_8);
    //     series_8.name('Person 8');
    //     series_8.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_8.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_9 = chart.line(seriesData_9);
    //     series_9.name('Person 9');
    //     series_9.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_9.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_10 = chart.line(seriesData_10);
    //     series_10.name('Person 10');
    //     series_10.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_10.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // create third series with mapped data
    //     var series_11 = chart.line(seriesData_11);
    //     series_11.name('Person 11');
    //     series_11.hovered().markers()
    //             .enabled(true)
    //             .type('circle')
    //             .size(4);
    //     series_11.tooltip()
    //             .position('right')
    //             .anchor('left-center')
    //             .offsetX(5)
    //             .offsetY(5);
    //     // turn the legend on
    //     chart.legend()
    //             .enabled(true)
    //             .fontSize(13)
    //             .padding([0, 0, 10, 0]);

    //     // set container id for the chart and set up paddings
    //     chart.container('testreport');

    //     // initiate chart drawing
    //     chart.draw();


    // });



// });
    





    // D3 Stuff below
    
// var 	formatAsPercentage = d3.format("%"),
// formatAsPercentage1Dec = d3.format(".1%"),
// formatAsInteger = d3.format(","),
// fsec = d3.time.format("%S s"),
// fmin = d3.time.format("%M m"),
// fhou = d3.time.format("%H h"),
// fwee = d3.time.format("%a"),
// fdat = d3.time.format("%d d"),
// fmon = d3.time.format("%b")
// ;

// /*
// ############# PIE CHART ###################
// -------------------------------------------
// */



// function dsPieChart(){

// var dataset = [
//     {category: "Sam", measure: 0.30},
//   {category: "Peter", measure: 0.25},
//   {category: "John", measure: 0.15},
//   {category: "Rick", measure: 0.05},
//   {category: "Lenny", measure: 0.18},
//   {category: "Paul", measure:0.04},
//   {category: "Steve", measure: 0.03}
//   ]
//   ;

// var 	width = 400,
//    height = 400,
//    outerRadius = Math.min(width, height) / 2,
//    innerRadius = outerRadius * .999,   
//    // for animation
//    innerRadiusFinal = outerRadius * .5,
//    innerRadiusFinal3 = outerRadius* .45,
//    color = d3.scale.category20()    //builtin range of colors
//    ;

// var vis = d3.select("#pieChart")
//  .append("svg:svg")              //create the SVG element inside the <body>
//  .data([dataset])                   //associate our data with the document
//      .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
//      .attr("height", height)
//          .append("svg:g")                //make a group to hold our pie chart
//      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")    //move the center of the pie chart from 0, 0 to radius, radius
//         ;
        
// var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
//     .outerRadius(outerRadius).innerRadius(innerRadius);

// // for animation
// var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
// var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

// var pie = d3.layout.pie()           //this will create arc data for us given a list of values
// .value(function(d) { return d.measure; });    //we must tell it out to access the value of each element in our data array

// var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
// .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
// .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
//     .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
//        .attr("class", "slice")    //allow us to style things in the slices (like text)
//        .on("mouseover", mouseover)
//             .on("mouseout", mouseout)
//             .on("click", up)
//             ;
            
// arcs.append("svg:path")
//        .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
//        .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
//             .append("svg:title") //mouseover title showing the figures
//            .text(function(d) { return d.data.category + ": " + formatAsPercentage(d.data.measure); });			

// d3.selectAll("g.slice").selectAll("path").transition()
//         .duration(750)
//         .delay(10)
//         .attr("d", arcFinal )
//         ;

// // Add a label to the larger arcs, translated to the arc centroid and rotated.
// // source: http://bl.ocks.org/1305337#index.html
// arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
//       .append("svg:text")
//   .attr("dy", ".35em")
//   .attr("text-anchor", "middle")
//   .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
//   //.text(function(d) { return formatAsPercentage(d.value); })
//   .text(function(d) { return d.data.category; })
//   ;

// // Computes the label angle of an arc, converting from radians to degrees.
// function angle(d) {
//     var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
//     return a > 90 ? a - 180 : a;
// }
    

// // Pie chart title			
// vis.append("svg:text")
//      .attr("dy", ".35em")
//   .attr("text-anchor", "middle")
//   .text("Revenue Share 2012")
//   .attr("class","title")
//   ;		    



// function mouseover() {
// d3.select(this).select("path").transition()
//   .duration(750)
//             //.attr("stroke","red")
//             //.attr("stroke-width", 1.5)
//             .attr("d", arcFinal3)
//             ;
// }

// function mouseout() {
// d3.select(this).select("path").transition()
//   .duration(750)
//             //.attr("stroke","blue")
//             //.attr("stroke-width", 1.5)
//             .attr("d", arcFinal)
//             ;
// }

// function up(d, i) {

//         /* update bar chart when user selects piece of the pie chart */
//         //updateBarChart(dataset[i].category);
//         updateBarChart(d.data.category, color(i));
//         updateLineChart(d.data.category, color(i));
     
// }
// }

// dsPieChart();

// /*
// ############# BAR CHART ###################
// -------------------------------------------
// */



// var datasetBarChart = [
// { group: "All", category: "Oranges", measure: 63850.4963 }, 
// { group: "All", category: "Apples", measure: 78258.0845 }, 
// { group: "All", category: "Grapes", measure: 60610.2355 }, 
// { group: "All", category: "Figs", measure: 30493.1686 }, 
// { group: "All", category: "Mangos", measure: 56097.0151 }, 
// { group: "Sam", category: "Oranges", measure: 19441.5648 }, 
// { group: "Sam", category: "Apples", measure: 25922.0864 }, 
// { group: "Sam", category: "Grapes", measure: 9720.7824 }, 
// { group: "Sam", category: "Figs", measure: 6480.5216 }, 
// { group: "Sam", category: "Mangos", measure: 19441.5648 }, 
// { group: "Peter", category: "Oranges", measure: 22913.2728 }, 
// { group: "Peter", category: "Apples", measure: 7637.7576 }, 
// { group: "Peter", category: "Grapes", measure: 23549.7526 }, 
// { group: "Peter", category: "Figs", measure: 1909.4394 }, 
// { group: "Peter", category: "Mangos", measure: 7637.7576 }, 
// { group: "John", category: "Oranges", measure: 1041.5124 }, 
// { group: "John", category: "Apples", measure: 2430.1956 }, 
// { group: "John", category: "Grapes", measure: 15275.5152 }, 
// { group: "John", category: "Figs", measure: 4166.0496 }, 
// { group: "John", category: "Mangos", measure: 11803.8072 }, 
// { group: "Rick", category: "Oranges", measure: 7406.3104 }, 
// { group: "Rick", category: "Apples", measure: 2545.9192 }, 
// { group: "Rick", category: "Grapes", measure: 1620.1304 }, 
// { group: "Rick", category: "Figs", measure: 8563.5464 }, 
// { group: "Rick", category: "Mangos", measure: 3008.8136 }, 
// { group: "Lenny", category: "Oranges", measure: 7637.7576 }, 
// { group: "Lenny", category: "Apples", measure: 35411.4216 }, 
// { group: "Lenny", category: "Grapes", measure: 8332.0992 }, 
// { group: "Lenny", category: "Figs", measure: 6249.0744 }, 
// { group: "Lenny", category: "Mangos", measure: 11803.8072 }, 
// { group: "Paul", category: "Oranges", measure: 3182.399 }, 
// { group: "Paul", category: "Apples", measure: 867.927 }, 
// { group: "Paul", category: "Grapes", measure: 1808.18125 }, 
// { group: "Paul", category: "Figs", measure: 795.59975 }, 
// { group: "Paul", category: "Mangos", measure: 578.618 }, 
// { group: "Steve", category: "Oranges", measure: 2227.6793 }, 
// { group: "Steve", category: "Apples", measure: 3442.7771 }, 
// { group: "Steve", category: "Grapes", measure: 303.77445 }, 
// { group: "Steve", category: "Figs", measure: 2328.93745 }, 
// { group: "Steve", category: "Mangos", measure: 1822.6467 }, 
// ]
// ;

// // set initial group value
// var group = "All";

// function datasetBarChosen(group) {
// var ds = [];
// for (x in datasetBarChart) {
//  if(datasetBarChart[x].group==group){
//      ds.push(datasetBarChart[x]);
//  } 
// }
// return ds;
// }


// function dsBarChartBasics() {

// var margin = {top: 30, right: 5, bottom: 20, left: 50},
// width = 500 - margin.left - margin.right,
// height = 250 - margin.top - margin.bottom,
// colorBar = d3.scale.category20(),
// barPadding = 1
// ;

// return {
//     margin : margin, 
//     width : width, 
//     height : height, 
//     colorBar : colorBar, 
//     barPadding : barPadding
// }			
// ;
// }

// function dsBarChart() {

// var firstDatasetBarChart = datasetBarChosen(group);         	

// var basics = dsBarChartBasics();

// var margin = basics.margin,
// width = basics.width,
// height = basics.height,
// colorBar = basics.colorBar,
// barPadding = basics.barPadding
// ;
            
// var 	xScale = d3.scale.linear()
//                 .domain([0, firstDatasetBarChart.length])
//                 .range([0, width])
//                 ;
                
// // Create linear y scale 
// // Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
// // get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
// var yScale = d3.scale.linear()
//     // use the max funtion to derive end point of the domain (max value of the dataset)
//     // do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
//    .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.measure; })])
//    // As coordinates are always defined from the top left corner, the y position of the bar
//    // is the svg height minus the data value. So you basically draw the bar starting from the top. 
//    // To have the y position calculated by the range function
//    .range([height, 0])
//    ;

// //Create SVG element

// var svg = d3.select("#barChart")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .attr("id","barChartPlot")
//     ;

// var plot = svg
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
//     ;
        
// plot.selectAll("rect")
//    .data(firstDatasetBarChart)
//    .enter()
//    .append("rect")
//     .attr("x", function(d, i) {
//         return xScale(i);
//     })
//    .attr("width", width / firstDatasetBarChart.length - barPadding)   
//     .attr("y", function(d) {
//         return yScale(d.measure);
//     })  
//     .attr("height", function(d) {
//         return height-yScale(d.measure);
//     })
//     .attr("fill", "lightgrey")
//     ;


// // Add y labels to plot	

// plot.selectAll("text")
// .data(firstDatasetBarChart)
// .enter()
// .append("text")
// .text(function(d) {
//     return formatAsInteger(d3.round(d.measure));
// })
// .attr("text-anchor", "middle")
// // Set x position to the left edge of each bar plus half the bar width
// .attr("x", function(d, i) {
//     return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
// })
// .attr("y", function(d) {
//     return yScale(d.measure) + 14;
// })
// .attr("class", "yAxis")
// /* moved to CSS			   
// .attr("font-family", "sans-serif")
// .attr("font-size", "11px")
// .attr("fill", "white")
// */
// ;

// // Add x labels to chart	

// var xLabels = svg
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
//     ;

// xLabels.selectAll("text.xAxis")
//   .data(firstDatasetBarChart)
//   .enter()
//   .append("text")
//   .text(function(d) { return d.category;})
//   .attr("text-anchor", "middle")
//     // Set x position to the left edge of each bar plus half the bar width
//                    .attr("x", function(d, i) {
//                            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
//                    })
//   .attr("y", 15)
//   .attr("class", "xAxis")
//   //.attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
//   ;			

// // Title

// svg.append("text")
// .attr("x", (width + margin.left + margin.right)/2)
// .attr("y", 15)
// .attr("class","title")				
// .attr("text-anchor", "middle")
// .text("Overall Sales Breakdown 2012")
// ;
// }

// dsBarChart();

// /* ** UPDATE CHART ** */

// /* updates bar chart on request */

// function updateBarChart(group, colorChosen) {

// var currentDatasetBarChart = datasetBarChosen(group);

// var basics = dsBarChartBasics();

// var margin = basics.margin,
//     width = basics.width,
//    height = basics.height,
//     colorBar = basics.colorBar,
//     barPadding = basics.barPadding
//     ;

// var 	xScale = d3.scale.linear()
//     .domain([0, currentDatasetBarChart.length])
//     .range([0, width])
//     ;

    
// var yScale = d3.scale.linear()
//   .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.measure; })])
//   .range([height,0])
//   ;
  
// var svg = d3.select("#barChart svg");
  
// var plot = d3.select("#barChartPlot")
//    .datum(currentDatasetBarChart)
//    ;

//       /* Note that here we only have to select the elements - no more appending! */
//   plot.selectAll("rect")
//   .data(currentDatasetBarChart)
//   .transition()
//     .duration(750)
//     .attr("x", function(d, i) {
//         return xScale(i);
//     })
//    .attr("width", width / currentDatasetBarChart.length - barPadding)   
//     .attr("y", function(d) {
//         return yScale(d.measure);
//     })  
//     .attr("height", function(d) {
//         return height-yScale(d.measure);
//     })
//     .attr("fill", colorChosen)
//     ;

// plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
//     .data(currentDatasetBarChart)
//     .transition()
//     .duration(750)
//    .attr("text-anchor", "middle")
//    .attr("x", function(d, i) {
//            return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
//    })
//    .attr("y", function(d) {
//            return yScale(d.measure) + 14;
//    })
//    .text(function(d) {
//         return formatAsInteger(d3.round(d.measure));
//    })
//    .attr("class", "yAxis")					 
// ;


// svg.selectAll("text.title") // target the text element(s) which has a title class defined
//     .attr("x", (width + margin.left + margin.right)/2)
//     .attr("y", 15)
//     .attr("class","title")				
//     .attr("text-anchor", "middle")
//     .text(group + "'s Sales Breakdown 2012")
// ;
// }


// /*
// ############# LINE CHART ##################
// -------------------------------------------
// */

// var datasetLineChart = [
// { group: "All", category: 2008, measure: 289309 }, 
// { group: "All", category: 2009, measure: 234998 }, 
// { group: "All", category: 2010, measure: 310900 }, 
// { group: "All", category: 2011, measure: 223900 }, 
// { group: "All", category: 2012, measure: 234500 }, 
// { group: "Sam", category: 2008, measure: 81006.52 }, 
// { group: "Sam", category: 2009, measure: 70499.4 }, 
// { group: "Sam", category: 2010, measure: 96379 }, 
// { group: "Sam", category: 2011, measure: 64931 }, 
// { group: "Sam", category: 2012, measure: 70350 }, 
// { group: "Peter", category: 2008, measure: 63647.98 }, 
// { group: "Peter", category: 2009, measure: 61099.48 }, 
// { group: "Peter", category: 2010, measure: 87052 }, 
// { group: "Peter", category: 2011, measure: 58214 }, 
// { group: "Peter", category: 2012, measure: 58625 }, 
// { group: "Rick", category: 2008, measure: 23144.72 }, 
// { group: "Rick", category: 2009, measure: 14099.88 }, 
// { group: "Rick", category: 2010, measure: 15545 }, 
// { group: "Rick", category: 2011, measure: 11195 }, 
// { group: "Rick", category: 2012, measure: 11725 }, 
// { group: "John", category: 2008, measure: 34717.08 }, 
// { group: "John", category: 2009, measure: 30549.74 }, 
// { group: "John", category: 2010, measure: 34199 }, 
// { group: "John", category: 2011, measure: 33585 }, 
// { group: "John", category: 2012, measure: 35175 }, 
// { group: "Lenny", category: 2008, measure: 69434.16 }, 
// { group: "Lenny", category: 2009, measure: 46999.6 }, 
// { group: "Lenny", category: 2010, measure: 62180 }, 
// { group: "Lenny", category: 2011, measure: 40302 }, 
// { group: "Lenny", category: 2012, measure: 42210 }, 
// { group: "Paul", category: 2008, measure: 7232.725 }, 
// { group: "Paul", category: 2009, measure: 4699.96 }, 
// { group: "Paul", category: 2010, measure: 6218 }, 
// { group: "Paul", category: 2011, measure: 8956 }, 
// { group: "Paul", category: 2012, measure: 9380 }, 
// { group: "Steve", category: 2008, measure: 10125.815 }, 
// { group: "Steve", category: 2009, measure: 7049.94 }, 
// { group: "Steve", category: 2010, measure: 9327 }, 
// { group: "Steve", category: 2011, measure: 6717 }, 
// { group: "Steve", category: 2012, measure: 7035 }
// ]
// ;

// // set initial category value
// var group = "All";

// function datasetLineChartChosen(group) {
// var ds = [];
// for (x in datasetLineChart) {
//  if(datasetLineChart[x].group==group){
//      ds.push(datasetLineChart[x]);
//  } 
// }
// return ds;
// }

// function dsLineChartBasics() {

// var margin = {top: 20, right: 10, bottom: 0, left: 50},
// width = 500 - margin.left - margin.right,
// height = 150 - margin.top - margin.bottom
// ;

// return {
//     margin : margin, 
//     width : width, 
//     height : height
// }			
// ;
// }


// function dsLineChart() {

// var firstDatasetLineChart = datasetLineChartChosen(group);    

// var basics = dsLineChartBasics();

// var margin = basics.margin,
// width = basics.width,
// height = basics.height
// ;

// var xScale = d3.scale.linear()
// .domain([0, firstDatasetLineChart.length-1])
// .range([0, width])
// ;

// var yScale = d3.scale.linear()
// .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.measure; })])
// .range([height, 0])
// ;

// var line = d3.svg.line()
// //.x(function(d) { return xScale(d.category); })
// .x(function(d, i) { return xScale(i); })
// .y(function(d) { return yScale(d.measure); })
// ;

// var svg = d3.select("#lineChart").append("svg")
// .datum(firstDatasetLineChart)
// .attr("width", width + margin.left + margin.right)
// .attr("height", height + margin.top + margin.bottom)
// // create group and move it so that margins are respected (space for axis and title)

// var plot = svg
// .append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// .attr("id", "lineChartPlot")
// ;

// /* descriptive titles as part of plot -- start */
// var dsLength=firstDatasetLineChart.length;

// plot.append("text")
// .text(firstDatasetLineChart[dsLength-1].measure)
// .attr("id","lineChartTitle2")
// .attr("x",width/2)
// .attr("y",height/2)	
// ;
// /* descriptive titles -- end */

// plot.append("path")
// .attr("class", "line")
// .attr("d", line)	
// // add color
// .attr("stroke", "lightgrey")
// ;

// plot.selectAll(".dot")
// .data(firstDatasetLineChart)
//    .enter().append("circle")
// .attr("class", "dot")
// //.attr("stroke", function (d) { return d.measure==datasetMeasureMin ? "red" : (d.measure==datasetMeasureMax ? "green" : "steelblue") } )
// .attr("fill", function (d) { return d.measure==d3.min(firstDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(firstDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
// //.attr("stroke-width", function (d) { return d.measure==datasetMeasureMin || d.measure==datasetMeasureMax ? "3px" : "1.5px"} )
// .attr("cx", line.x())
// .attr("cy", line.y())
// .attr("r", 3.5)
// .attr("stroke", "lightgrey")
// .append("title")
// .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })
// ;

// svg.append("text")
// .text("Performance 2012")
// .attr("id","lineChartTitle1")	
// .attr("x",margin.left + ((width + margin.right)/2))
// .attr("y", 10)
// ;

// }

// dsLineChart();


// /* ** UPDATE CHART ** */

// /* updates bar chart on request */
// function updateLineChart(group, colorChosen) {

// var currentDatasetLineChart = datasetLineChartChosen(group);   

// var basics = dsLineChartBasics();

// var margin = basics.margin,
// width = basics.width,
// height = basics.height
// ;

// var xScale = d3.scale.linear()
// .domain([0, currentDatasetLineChart.length-1])
// .range([0, width])
// ;

// var yScale = d3.scale.linear()
// .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.measure; })])
// .range([height, 0])
// ;

// var line = d3.svg.line()
// .x(function(d, i) { return xScale(i); })
// .y(function(d) { return yScale(d.measure); })
// ;

// var plot = d3.select("#lineChartPlot")
// .datum(currentDatasetLineChart)
// ;

// /* descriptive titles as part of plot -- start */
// var dsLength=currentDatasetLineChart.length;

// plot.select("text")
// .text(currentDatasetLineChart[dsLength-1].measure)
// ;
// /* descriptive titles -- end */

// plot
// .select("path")
// .transition()
// .duration(750)			    
// .attr("class", "line")
// .attr("d", line)	
// // add color
// .attr("stroke", colorChosen)
// ;

// var path = plot
// .selectAll(".dot")
// .data(currentDatasetLineChart)
// .transition()
// .duration(750)
// .attr("class", "dot")
// .attr("fill", function (d) { return d.measure==d3.min(currentDatasetLineChart, function(d) { return d.measure; }) ? "red" : (d.measure==d3.max(currentDatasetLineChart, function(d) { return d.measure; }) ? "green" : "white") } )
// .attr("cx", line.x())
// .attr("cy", line.y())
// .attr("r", 3.5)
// // add color
// .attr("stroke", colorChosen)
// ;

// path
// .selectAll("title")
// .text(function(d) { return d.category + ": " + formatAsInteger(d.measure); })	 
// ;  

// }





