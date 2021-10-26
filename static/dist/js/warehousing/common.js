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

// select2Function = () =>
// {
    // In your Javascript (external .js resource or <script> tag)
    $(document).ready(function() {
        $('.js-example-basic-single').select2();
    });
// }
// select2Function();

loadNotif = () => {

    $.ajax(
    {
        url: apiURL + "notifications",
        type: "GET",
        dataType: "json",
        success: function (notifData) 
        { 
            // var notifs_number_1 = notifData.length;
            // countNotif(notifs_number_1)

            // console.log(notifData.length)
            // for (var i = 0; i < notifData.length; i++)
            // {
            //     console.log(notifData[i].notification_id)
            // }
            $.each(notifData, function (x, dataOptions) 
            {
                if(notifData[x].status == "Resolved")
                {
                    console.log(notifData[x].notification_id)
                    $.ajax(
                    {
                        url: apiURL + "notifications/" + notifData[x].notification_id,
                        type: "DELETE",
                        dataType: "json",
                        success: function (data) 
                        { 
                            console.log("Deleted")
                        }
                    });
                }
            });
            if (USER_TYPE == "Admin" || USER_TYPE == "Manager")
            {
                $.each(notifData, function (i, dataOptions) 
                {
                    $("#how_many_staff_notif").empty();
                    $("#staff_notif").empty();

                    // var notifs_number = "";
                    // notifs_number = notifData.length;
                    // $("#notif_number").append(notifs_number);

                    var how_many_staff_notifs = "";
                    how_many_staff_notifs = notifData.length + 
                        ' Notification/s from Staff';
                    $("#how_many_staff_notif").append(how_many_staff_notifs);

                    var notifs = "";
                    notifs +=
                        '<div class="dropdown-divider"></div>' + 
                        '<a href="javascript:notifResolved(\'' + 
                        notifData[i]["notification_id"] + 
                        '\')" class="dropdown-item">' +
                            '<i class="fas fa-box mr-2"></i>' +
                                notifData[i].supply_notif.supply_name + 
                            '<span class="float-right text-info text-sm">' +
                                'is requested by Employee, click to resolved'
                            '</span>' +
                        '</a>';
                    $("#staff_notif").append(notifs);

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

                    // console.log(responseData)
                });
            }
        },
        error: function(errData)
        {
            
        }
    });
    $.ajax(
    {
        url: apiURL + "supplies_count",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            // $("#notif_number").empty();
            // var notifs_number = "";
            var notifs_number = responseData.length;
            countNotif(notifs_number)
            // $("#notif_number").append(notifs_number);
            

            $("#how_many_notif").empty();

            var how_many_notifs = "";
            how_many_notifs = responseData.length + 
                ' Supply Notification/s';
            $("#how_many_notif").append(how_many_notifs);

            $.each(responseData, function (i, dataOptions) 
            {
                // $("#notifications").empty();
                var notifs = "";
                notifs +=
                    '<div class="dropdown-divider"></div>' + 
                    '<a href="/warehousing/admin/supplies" class="dropdown-item">' +
                        '<i class="fas fa-box mr-2"></i>' +
                            responseData[i].supply_name +
                        '<span class="float-right text-danger text-sm">' +
                            'is Low on Stocks'
                        '</span>' +
                    '</a>';
                $("#notifications").append(notifs);

                console.log(responseData)


                $("#see_all_notif").empty();
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

countNotif = (notifs_number, notifs_number_1) =>
{
    var count = 0;

    $("#notif_number").empty();
    // var number_notifs = "";
    count = count + notifs_number
    $("#notif_number").append(count);
    console.log(count)
}
countNotif();

// function to delete data
notifResolved = (notification_id) => 
{
    console.log(notification_id)
	Swal.fire(
	{
		title: "Is this already resolved?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: !0,
		confirmButtonColor: "#34c38f",
		cancelButtonColor: "#f46a6a",
		confirmButtonText: "Yes, it is!",
	})
	.then(function (t) 
	{
		// if user clickes yes, it will change the active status to "Not Active".
		if (t.value) 
		{
            $.ajax(
            {
                url: apiURL + "notifications/" + notification_id,
                type: "PUT",
                data: JSON.stringify(
                {		
                    "status": "Resolved",
                }),
                dataType: "JSON",
                contentType: 'application/json',
                processData: false,
                cache: false,
                success: function (data) 
                {
                    loadNotif();
                    notification("success", "Success!", "Notification Resolved")
                    setTimeout(function() {
                        // Do something after 5 seconds
                        location.reload();//reload page
                  }, 1500);
                },
				error: function ({ responseJSON }) {},
			});
		}
	});
};

// setInterval(function() 
// { 
//     countNotif(); 
// }, 10000);

// setInterval(function() 
// { 
//     loadNotif(); 
// }, 10000);

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

