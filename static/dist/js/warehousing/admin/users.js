$(function() 
{
    // Load Table
    loadTable();

    // function to save record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var user_id = $("#uuid").val();
        var user_type = $("#user_type").val()
        var user_email = $("#user_email").val();
        var user_password = $("#user_password").val();

        console.log(user_email)
        if (user_id == "" && user_type != "" && user_email != "" && user_email != "" && user_password !="")
        {
            document.getElementById("form_id").classList.add('was-validated');
            $.ajax(
            {
                url: apiURL + "users/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "user_email": user_email,
                    "user_password": user_password,
                    "user_type": user_type
                }),
                dataType: "JSON",
                contentType: 'application/json',
                processData: false,
                cache: false,
                success: function (data) 
                {
                    // $('#button_add').prop('disabled', true)
                    notification("success", "Success!", data.message);
                    loadTable();
                    $("#adding_modal").modal('hide')
                    // $('#form_id').trigger("reset")
                    $("#form_id")[0].reset();
                    setTimeout(() => {$document.getElementById("form_id").classList.remove("was-validated")}); //timeout allows for 'was-validated' to be added then removed.
                },
                error: function ({ responseJSON }) 
                {
                    
                },
            });
        }  
    });
    // $('#button_add').prop('enabled', true)
});

//    $.ajaxSetup(
//     {
// 		headers: 
//         {
// 			Accept: "application/json",
// 			Authorization: "Bearer " + token,
// 			ContentType: "application/x-www-form-urlencoded",
// 		},
// 	});
loadTable = () => 
{
    $("#data-table").dataTable().fnClearTable();
    $("#data-table").dataTable().fnDraw();
    $("#data-table").dataTable().fnDestroy();
    $("#data-table").dataTable({
        serverSide: true,
        // scrollX: true,
        responsive: false,
        buttons:[
            {extend: 'excel', text: 'Save to Excel File'}
        ],
        order: [[0, "desc"]],
        aLengthMenu: [15, 30, 45, 60, 75, 90],
        aaColumns: [
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "user_email",
                name: "user_email",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "user_type",
                name: "user_type",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "active_status",
                name: "active_status",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "created_at",
                name: "created_at",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: null,
                // width: "30%",
                class: "text-center", 
                render: function (aData, type, row) 
                {
                    let buttons = "";

                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            // '<div class="dropdown-item d-flex" role="button"onClick="return viewData(\'' +
                    //     aData["user_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View User</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["user_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit User' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["user_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete User' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';
                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/users/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";

            buttons +=
            '<div class="text-center dropdown">' +
                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                    '<i class="fas fa-ellipsis-v"></i>'  +
                '</div>' +
                '<div class="dropdown-menu dropdown-menu-right">'  +
                //Info
                    // '<div class="dropdown-item d-flex" role="button"onClick="return viewData(\'' +
            //     aData["user_id"] +
            //     '\',0)>'  +
                    //     '<div style="width: 2rem">' +
                    //         '<i class="fas fa-eye mr-1"></i>'  +
                    //     '</div>' +
                    //     '<div>View User</div>'  +
                    // '</div>'  +
                // Edit
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                    aData["user_id"] +
                    '\',1)">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-edit mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Edit User' +
                        '</div>'  +
                    '</div>' +
                // Delete
                    '<div class="dropdown-divider"></div>' +
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                    aData["user_id"] + 
                    '\')">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-trash-alt mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Delete User' +
                        '</div>'  +
                    '</div>'  +
                '</div>'  +
            '</div>';
            
            var createdDate = moment(aData["created_at"]).format("MMMM D, YYYY <br> hh:mm:ss");
            moment(aData["created_at"]).fromNow();

            // var dateCreated = new Date(aData["created_at"]);
			// var createdDate = dateCreated.toLocaleString();

            var user_id = ""

            if(aData["user_id"] == null)
            {
                user_id = "null"
            }
            else
            {
                user_id = aData["user_id"]
            }

            $("td:eq(0)", nRow).html(aData["user_email"]);
            $("td:eq(1)", nRow).html(aData["user_type"]);

            if (aData["active_status"] == "Active" || aData["active_status"] == "Yes")
            {
                $("td:eq(2)", nRow).html('<div class=”badge badge-success p-2 w-100”>'+ aData["active_status"] + '</div>');
            }
            else
            {
                $("td:eq(2)", nRow).html('<div class=”badge badge-warning p-2 w-100”>'+ aData["active_status"] + '</div>');
            }
            $("td:eq(3)", nRow).html(createdDate);
            $("td:eq(4)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

// function to view data
viewData = (user_id) =>
{
    $.ajax(
		{
		url: apiURL + "users/" + user_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            $("#modal_viewing").empty();
			var details = "";                                      
            details =
                '<div class="card-body">' +
                    '<div class="row justify-content-centerr">' +
                        '<input type="hidden" name="uuid" id="uuid" value="' +data.user_id+ '" />' +
                        '<div class="col-md-4">' +
                            '<div class="form-group">' +
                                '<label for="user_email">Email address</label>' +
                                '<br>' +
                                '&nbsp&nbsp&nbsp' + 
                                data.user_email +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-4">' +
                            '<div class="form-group">' +
                                '<label for="user_type">User type</label>' +
                                '<br>' +
                                '&nbsp&nbsp&nbsp' +
                                data.user_type +
                            '</div>' +
                        '</div>' +
                        '<div class="col-md-4">' +
                            '<div class="form-group">' +
                                '<label for="active_status">Status</label>' +
                                '<br>' +
                                '&nbsp&nbsp&nbsp' +
                                data.active_status +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '</div>' +
                    '</div>'
                '</div>';
            $("#modal_viewing").append(details);
        }
    });
}

// function to edit data
editData = (user_id, type) => 
{
    $("#e_form_id")[0].reset();
	$.ajax(
		{
		url: apiURL + "users/" + user_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{

            if (type == 1) 
            {
                if(data["active_status"] == "Not Active" || data["active_status"] == "Yes")
                {
                    $("#e_active_status").show();
                    $("#e_statusLabel").show();
                    $("#e_uuid").val(data["user_id"]);
                    $("#e_user_type").val(data["user_type"]).trigger("change");
                    $("#e_active_status").val(data["active_status"]).trigger("change");
                    
                    var user_email = data["user_email"];
                    var user_password = data["user_password"];
                
                    $("#e_form_id").on("submit", function (e)
                    {
                        var user_id = $("#e_uuid").val();
                        var user_type = $("#e_user_type").val()
                        var active_status = $("#e_active_status").val()
                        

                        $.ajax(
                        {
                            url: apiURL + "users/" + user_id,
                            type: "PUT",
                            data: JSON.stringify(
                            {		
                                "user_email": user_email,
                                "user_type": user_type,
                                "active_status": active_status,
                            }),
                            dataType: "JSON",
                            contentType: 'application/json',
                            processData: false,
                            cache: false,
                            success: function (data) 
                            {
                                notification("success", "Success!", data.message);
                                loadTable();
                                $("#editing_modal").modal('hide')
                            },
                            error: function ({ responseJSON }) 
                            {
                                
                            },
                        });
                    });

                }
                else if (data["active_status"] == "Active")
                {                
                    $("#e_uuid").val(data["user_id"]);
                    $("#e_user_type").val(data["user_type"]).trigger("change");       
                    $("#e_active_status").hide();
                    $("#e_statusLabel").hide();
                    
                    var user_email = data["user_email"];
                    var user_password = data["user_password"];

                    console.log()

                    $("#e_form_id").on("submit", function (e)
                    {
                        e.preventDefault();
                        trimInputFields();
                        var user_id = $("#e_uuid").val();
                        var user_type = $("#e_user_type").val()
                        var active_status = $("#e_active_status").val()
                        

                        if (user_id != "")
                        {
                            $.ajax(
                            {
                                url: apiURL + "users/" + user_id,
                                type: "PUT",
                                data: JSON.stringify(
                                {		
                                    "user_email": user_email,
                                    "user_type": user_type,
                                    "active_status": active_status,
                                }),
                                dataType: "JSON",
                                contentType: 'application/json',
                                processData: false,
                                cache: false,
                                success: function (data) 
                                {
                                    $("#editing_modal").modal('hide')
                                    notification("success", "Success!", data.message);
                                    loadTable();
                                },
                                error: function ({ responseJSON }) 
                                {
                                    
                                },
                            });
                        }
                    });
                }
            }
		},
		error: function (data) {},
	});
};

// function to delete data
// deleteData = (user_id) => 
// {
// 	Swal.fire(
// 	{
// 		title: "Are you sure you want to delete this record?",
// 		text: "You won't be able to revert this!",
// 		icon: "warning",
// 		showCancelButton: !0,
// 		confirmButtonColor: "#34c38f",
// 		cancelButtonColor: "#f46a6a",
// 		confirmButtonText: "Yes, delete it!",
// 	})
// 	.then(function (t) 
// 	{
// 		// if user clickes yes, it will change the active status to "Not Active".
// 		if (t.value) 
// 		{
// 			$.ajax(
// 				{
// 				url: apiURL + "users/" + user_id,
// 				type: "DELETE",
// 				dataType: "json",
// 				success: function (data) 
//                 {
//                     notification("success", "Success!", data.message);
//                     loadTable();
// 				},
// 				error: function ({ responseJSON }) {},
// 			});
// 		}
// 	});
// };
deleteData = (user_id) => 
{
    $("#d_uuid").val(user_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "users/" + user_id,
            type: "DELETE",
            dataType: "json",
            success: function (data) 
            {
                notification("info", "Success!", data.message);
                loadTable();
                loadNotif();
                $("#delete_modal").modal('hide')
            },
            error: function ({ responseJSON }) {},
        });
    });
};
