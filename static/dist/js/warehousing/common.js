const apiURL = "http://localhost:8000/";
const baseURL = "http://localhost:8000/warehousing/"


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

