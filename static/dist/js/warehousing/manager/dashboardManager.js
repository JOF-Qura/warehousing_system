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