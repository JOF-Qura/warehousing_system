const apiURL = "http://localhost:8000/";
const baseURL = "http://localhost:8000/warehousing/"

var TOKEN = sessionStorage.getItem('TOKEN')
var USER_TYPE = sessionStorage.getItem('USER_TYPE')
var USER_EMAIL = sessionStorage.getItem('USER_EMAIL')

// loadEmail = () => 
// {
//     if(USER_EMAIL != null || USER_EMAIL != "" || USER_TYPE != null || USER_TYPE != "")
//     {
//         $("#user_email_id").empty();
//         var options = "";

//         options = '<h6>' + 
//                     USER_EMAIL +
//                 '</h6>';

//         $("#user_email_id").append(options);

//         console.log(options);
//     }
// }
// loadEmail()

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

                var all_notifs = "";
                
                    if(USER_TYPE == "Manager")
                    {
                        all_notifs =
                        '<a href="/warehousing/manager/supplies" class="dropdown-item dropdown-footer">Go to Supply Page</a>'
                    }
                    else if(USER_TYPE == "Admin")
                    {
                        all_notifs =
                        '<a href="/warehousing/admin/supplies" class="dropdown-item dropdown-footer">Go to Supply Page</a>'
                    };
                $("#see_all_notif").append(all_notifs);

                console.log(responseData)
            });
        },
        error: function ({ responseJSON }) {},
    });
};
loadNotif();


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

_GET = (param) =>
{
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

// var $_GET = _GET()

// type = error, warning, success, info
// title - string
// message = string
const notification = (type, title, message) => 
{
    return toastr[type](message, title);
};

// get token
// const token = localStorage.getItem('TOKEN');
let button = document.querySelector(".submit");

// Append headers to Ajax attributes
// $.ajaxSetup(
//     {
//         headers:
//         {
//             Accept: "application/json",
//             Authorization: "Bearer " + token,
//         },
//     });

// when ajax has started
$(document).ajaxStart(function ()
{
    button != undefined ? (button.disabled = true) : null;
});

// // when ajax has sent the request
$(document).ajaxSend(function ()
{
    button != undefined ? (button.disabled = true) : null;
});

// // ajax receieved a response
$(document).ajaxComplete(function ()
{
    button != undefined ? (button.disabled = false) : null;
});

// // ajax has error
$(document).ajaxError(function ()
{
    button != undefined ? (button.disabled = false) : null;
});

// @param:
//      action = show, hide
formReset = (action = "hide") => 
{
    // if(user_type == "Manager" || user_type == "Agent")
    // {
    //     $("html,body").animate({scrollTop: 0}, "slow");
    // }
    // else if (user_type == "Customer")
    // {
    //     $("html,body").animate({scrollTop: 500}, "slow");
    // }
    
    if(action == "hide")
    {
        //hide and clear form
        $("#form_id")[0].reset();
        $("#div_form").hide();
        $("#btn_add").show();
        $("#edit_btn").show();
        $("#message_btn").show();
        // $("#uuid").val("");

        if (user_type == "Customer")
        {
            $("html,body").animate({scrollTop: 2}, "slow");
        }

    }
    else if (action == "show")
    {
        if(user_type == "Manager" || user_type == "Agent")
        {
            $("html,body").animate({scrollTop: 0}, "slow");
        }
        else if (user_type == "Customer")
        {
            $("html,body").animate({scrollTop: 0}, "slow");
        }
        // show
        $("#div_form").show();
        $("#btn_add").hide();
        $("#form_submit").show();
        $("#message_btn").hide();
        $("#edit_btn").hide();
        $("#form_id input, select, textarea, date").prop("disabled", false);
        $("#form_id button").prop("disabled", false);
        $("#isActive").hide();
        $("#statusLabel").hide();
    }
};

// trim input fields except file, select, textarea
trimInputFields = () => 
{
	var allInputs = $("input:not(:file())");
	allInputs.each(function () 
    {
		$(this).val($.trim($(this).val()));
	});
};


viewByID = () => 
{
	var model = "";
    var id = "";

    $.ajax(
        {
            url: apiURL + model + id,
            type: "GET",
            dataType: "json",
            success: function (responseData) 
            {
            },
            error: function (responseData) {},
        });
};

