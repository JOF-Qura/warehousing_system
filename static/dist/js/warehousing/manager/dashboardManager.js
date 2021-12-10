$(function() 
{

    
});





countPendingRequest = () =>
{
    $.ajax(
    {
        url: apiURL + "request_count",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $("#pending_request").empty();

            var details = "";                                      
            details +=
                '<div class="inner">' +
                    '<h3>' + responseData.length + '</h3>' +
                    '<p>Pending Request</p>' +
                '</div>' +
                '<div class="icon">' +
                    '<i class="fas fa-dolly"></i>' +
                '</div>';
            if(USER_TYPE == "Admin")
            {
                details +=
                '<a href="/warehousing/admin/request" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Manager")
            {
                details +=
                '<a href="/warehousing/manager/request" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Staff")
            {
                details +=
                '<a href="/warehousing/staff/request" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            $("#pending_request").append(details);
        }
    });
}
countPendingRequest();

countPendingReturn = () =>
{
    $.ajax(
    {
        url: apiURL + "returns_count",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            console.log(responseData)
            $("#pending_return").empty();

            var details = "";    
                                     
            details +=
                '<div class="inner">' +
                    '<h3>' + responseData.length + '</h3>' +
                    '<p>Pending Return</p>' +
                '</div>' + 
                '<div class="icon">' + 
                    '<i class="fas fa-box"></i>' + 
                '</div>';
            if(USER_TYPE == "Admin")
            {
                details +=
                '<a href="/warehousing/admin/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Manager")
            {
                details +=
                '<a href="/warehousing/manager/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Staff")
            {
                details +=
                '<a href="/warehousing/staff/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            $("#pending_return").append(details);
        },
        error: function (errData)
        {
            $("#pending_return").empty();
            var details = "";   

            details +=
                '<div class="inner">' +
                    '<h3>0</h3>' +
                    '<p>Pending Return</p>' +
                '</div>' +
                '<div class="icon">' +
                    '<i class="fas fa-box"></i>' +
                '</div>';
            if(USER_TYPE == "Admin")
            {
                details +=
                '<a href="/warehousing/admin/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Manager")
            {
                details +=
                '<a href="/warehousing/manager/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Staff")
            {
                details +=
                '<a href="/warehousing/staff/return" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            $("#pending_return").append(details);
        }
    });
}
countPendingReturn();

countLowSupplies = () =>
{
    $.ajax(
    {
        url: apiURL + "supplies_count",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            console.log(responseData)
            $("#supply_low_stock").empty();

            var details = "";    
                                     
            details +=
                '<div class="inner">' +
                    '<h3>' + responseData.length + '</h3>' +
                    '<p>Supply Low on Stock</p>' +
                '</div>' +
                '<div class="icon">' +
                    '<i class="fas fa-cubes"></i>' +
                '</div>';
            if(USER_TYPE == "Admin")
            {
                details +=
                '<a href="/warehousing/admin/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Manager")
            {
                details +=
                '<a href="/warehousing/manager/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Staff")
            {
                details +=
                '<a href="/warehousing/staff/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            $("#supply_low_stock").append(details);
        },
        error: function (errData)
        {
            $("#supply_low_stock").empty();
            var details = "";   
            
            details +=
                '<div class="inner">' +
                    '<h3>0</h3>' +
                    '<p>Supply Low on Stock</p>' +
                '</div>' +
                '<div class="icon">' +
                    '<i class="fas fa-cubes"></i>' +
                '</div>';
            if(USER_TYPE == "Admin")
            {
                details +=
                '<a href="/warehousing/admin/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Manager")
            {
                details +=
                '<a href="/warehousing/manager/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            else if(USER_TYPE == "Staff")
            {
                details +=
                '<a href="/warehousing/staff/supplies" class="small-box-footer">' +
                    ' More info <i class="fas fa-arrow-circle-right"></i>' +
                '</a>';
            }
            $("#supply_low_stock").append(details);
        }
    });
}
countLowSupplies();

chart_JS = () =>
{
    /* ChartJS
    * -------
    * Here we will create a few charts using ChartJS
    */

//-------------------------------------------------------------
    //--------------
    //- AREA CHART -
    //--------------

    // Get context with jQuery - using jQuery's .get() method.
    var areaChartCanvas = $('#areaChart').get(0).getContext('2d')

    var areaChartData = 
    {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        datasets: [
        {
            label               : 'Return',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [28, 48, 40, 19, 86, 27, 90, 5, 20, 66, 69, 22]
        },
        {
            label               : 'Request',
            backgroundColor     : 'rgba(210, 214, 222, 1)',
            borderColor         : 'rgba(210, 214, 222, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(210, 214, 222, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : [65, 59, 80, 81, 56, 55, 40, 30, 35, 34, 65, 90]
        },
        ]
    }

    var areaChartOptions = {
        maintainAspectRatio : false,
        responsive : true,
        legend: {
        display: false
        },
        scales: {
        xAxes: [{
            gridLines : {
            display : false,
            }
        }],
        yAxes: [{
            gridLines : {
            display : false,
            }
        }]
        }
    }

    // This will get the first returned node in the jQuery collection.
    new Chart(areaChartCanvas, {
        type: 'line',
        data: areaChartData,
        options: areaChartOptions
    })
    
//-------------------------------------------------------------
    // //-------------
    // //- LINE CHART -
    // //--------------
    // var lineChartCanvas = $('#lineChart').get(0).getContext('2d')
    // var lineChartOptions = $.extend(true, {}, areaChartOptions)
    // var lineChartData = $.extend(true, {}, areaChartData)
    // lineChartData.datasets[0].fill = false;
    // lineChartData.datasets[1].fill = false;
    // lineChartOptions.datasetFill = false

    // var lineChart = new Chart(lineChartCanvas, {
    //     type: 'line',
    //     data: lineChartData,
    //     options: lineChartOptions
    // })

//-------------------------------------------------------------
    //-------------
    //- DONUT CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    var donutChartCanvas = $('#donutChart').get(0).getContext('2d')
    var donutData        = {
        labels: [
            'Supply 1',
            'Supply 2',
            'Supply 3',
            'Supply 4',
            'Supply 5',
        ],
        datasets: [
        {
            data: [700,500,400,600,300],
            backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc'],
        }
        ]
    }
    var donutOptions     = {
        maintainAspectRatio : false,
        responsive : true,
    }
    //Create pie or douhnut chart
    // You can switch between pie and douhnut using the method below.
    new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: donutData,
        options: donutOptions
    })

//-------------------------------------------------------------
    //-------------
    //- PIE CHART -
    //-------------
    // Get context with jQuery - using jQuery's .get() method.
    // var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
    // var pieData        = donutData;
    // var pieOptions     = {
    //     maintainAspectRatio : false,
    //     responsive : true,
    // }
    // //Create pie or douhnut chart
    // // You can switch between pie and douhnut using the method below.
    // new Chart(pieChartCanvas, {
    //     type: 'pie',
    //     data: pieData,
    //     options: pieOptions
    // })

//-------------------------------------------------------------
    //-------------
    //- BAR CHART -
    //-------------
    var barData = 
    {
        labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',],
        datasets: [
        {
            label               : 'Return',
            backgroundColor     : 'rgba(60,141,188,0.9)',
            borderColor         : 'rgba(60,141,188,0.8)',
            pointRadius          : false,
            pointColor          : '#3b8bba',
            pointStrokeColor    : 'rgba(60,141,188,1)',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data                : [28, 48, 40, 19, 86, 27, 90, 30, 40, 60, 80, 10]
        },
        {
            label               : 'Request',
            backgroundColor     : 'rgba(210, 214, 222, 1)',
            borderColor         : 'rgba(210, 214, 222, 1)',
            pointRadius         : false,
            pointColor          : 'rgba(210, 214, 222, 1)',
            pointStrokeColor    : '#c1c7d1',
            pointHighlightFill  : '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data                : [65, 59, 80, 81, 56, 55, 40, 20, 60, 40, 20, 15]
        },
        ]
    }

    var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartData = $.extend(true, {}, barData)
    var temp0 = barData.datasets[0]
    var temp1 = barData.datasets[1]
    barChartData.datasets[0] = temp1
    barChartData.datasets[1] = temp0

    var barChartOptions = {
        responsive              : true,
        maintainAspectRatio     : false,
        datasetFill             : false
    }

    new Chart(barChartCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
    })

//-------------------------------------------------------------
    //---------------------
    //- STACKED BAR CHART -
    //---------------------
    // var stackedBarChartCanvas = $('#stackedBarChart').get(0).getContext('2d')
    // var stackedBarChartData = $.extend(true, {}, barChartData)

    // var stackedBarChartOptions = {
    //     responsive              : true,
    //     maintainAspectRatio     : false,
    //     scales: {
    //     xAxes: [{
    //         stacked: true,
    //     }],
    //     yAxes: [{
    //         stacked: true
    //     }]
    //     }
    // }

    // new Chart(stackedBarChartCanvas, {
    //     type: 'bar',
    //     data: stackedBarChartData,
    //     options: stackedBarChartOptions
    // })
}
chart_JS()

