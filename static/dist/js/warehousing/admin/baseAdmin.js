$(function() 
{

});

loadNotif = () => {
    $.ajax(
    {
        url: apiURL + "supplies_count",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData, function (i, dataOptions) 
            {
                $("#notif_number").empty();
                $("#how_many_notif").empty();

                var notifs_number = "";
                notifs_number = responseData.length;
                $("#notif_number").append(notifs_number);

                var how_many_notifs = "";
                how_many_notifs = responseData.length + 
                    ' Supply Notification/s';
                $("#how_many_notif").append(how_many_notifs);

                var notifs = "";
                notifs +=
                    '<div class="dropdown-divider"></div>' + 
                    '<a href="/warehousing/admin/inventories" class="dropdown-item">' +
                        '<i class="fas fa-box mr-2"></i>' +
                            responseData[i].supply_name +
                        '<span class="float-right text-danger text-sm">' +
                            'is Low on Stocks'
                        '</span>' +
                    '</a>';
                $("#notifications").append(notifs);
                console.log(responseData)
            });
        },
        error: function ({ responseJSON }) {},
    });
};
loadNotif();
