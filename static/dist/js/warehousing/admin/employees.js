$(function() 
{
    loadTable();
    $('#button_add').prop('disabled', false)
    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var employee_id = $("#uuid").val();
        var user_id = $("#user_id").val()
        var user_type = $("#user_type").val()
        var employee_first_name = $("#employee_first_name").val();
        var employee_middle_name = $("#employee_middle_name").val();
        var employee_last_name = $("#employee_last_name").val();
        var employee_contact = $("#employee_contact").val();
        var employee_address = $("#employee_address").val();
        var employee_first_name = $("#employee_first_name").val();
        var employee_age = $("#employee_age").val();

        if (user_id == "" || user_id == null)
        {
            user_id = null;
        }
        else
        {
            $.ajax(
            {
                url: apiURL + "users/" + user_id,
                type: "GET",
                success: function(data)
                {
                    user_id = user_id
                    user_type = data.user_type
                }
            });
        }

        if (employee_id == "")
        {
            $.ajax(
            {
                url: apiURL + "employees/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "user_id": user_id,
                    "user_type": user_type,
                    "employee_first_name": employee_first_name,
                    "employee_middle_name": employee_middle_name,
                    "employee_last_name": employee_last_name,
                    "employee_contact": employee_contact,
                    "employee_address": employee_address,
                    "employee_age": employee_age,
                }),
                dataType: "JSON",
                contentType: 'application/json',
                processData: false,
                cache: false,
                success: function (data) 
                {
                    console.log(data)
                    $('#form_id').trigger("reset")
                    // $('#button_add').prop('disabled', true)
                    notification("success", "Success!", data.message);
                    loadTable();
                    $("#adding_modal").modal('hide')
                },
                error: function ({ responseJSON }) 
                {
                    
                },
            });
        }
    });
    // $('#button_add').prop('disabled', false)
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
        order: [[5, "desc"]],
        aLengthMenu: [5, 10, 20, 30, 50, 100],
        aaColumns: [
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "user_id",
                name: "user_id",
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
                data: "employee_first_name",
                name: "employee_first_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_middle_name",
                name: "employee_middle_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_last_name",
                name: "employee_last_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_age",
                name: "employee_age",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_contact",
                name: "employee_contact",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_address",
                name: "employee_address",
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
                    //     aData["employee_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Employee</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["employee_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Employee' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["employee_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Employee' +
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
            url: '/employees/datatable',
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
                    //     aData["employee_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Employee</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["employee_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Employee' +
                                '</div>'  +
                            '</div>';
                        // Delete
                        if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                        {
                            buttons +=
                                '<div class="dropdown-divider"></div>' +
                                '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                aData["employee_id"] + 
                                '\')">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-trash-alt mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'Delete Employee' +
                                    '</div>'  +
                                '</div>'  +
                            '</div>'  +
                        '</div>';
                        }
            // var dateCreated = new Date(aData["user_created_date"]);
            // var createdDate = dateCreated.toLocaleString();

            var employee_id = ""

            if(aData["user_id"] == null)
            {
                user_id = "Not a System User"
            }
            else
            {
                user_id = aData["user_id"]
            }

            var full_name = aData["employee_last_name"] + ", " + aData["employee_first_name"] + " " + aData["employee_middle_name"]
            
            full_name = (aData["employee_last_name"] + ", " + aData["employee_first_name"] + " " + aData["employee_middle_name"])
            console.log(full_name)


            $("td:eq(0)", nRow).html(user_id);
            $("td:eq(1)", nRow).html(aData["user_type"]);
            $("td:eq(2)", nRow).html(aData["employee_first_name"]);
            $("td:eq(3)", nRow).html(aData["employee_middle_name"]);
            $("td:eq(4)", nRow).html(aData["employee_last_name"]);
            $("td:eq(5)", nRow).html(aData["employee_age"]);
            $("td:eq(6)", nRow).html(aData["employee_contact"]);
            $("td:eq(7)", nRow).html(aData["employee_address"]);
            $("td:eq(8)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
    // columns.adjust().draw();
};

loadUsers = () => {
    $.ajax({
        url: apiURL + "users",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Users, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.user_id +
                    "'>" +
                    dataOptions.user_email +
                    "</option>";

                $("#user_id").append(options);
                $("#e_user_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadUsers();

// function to edit data
editData = (employee_id, type) => 
{
    $("#e_form_id")[0].reset();
	$.ajax(
		{
		url: apiURL + "employees/" + employee_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{

            if (type == 1)
            {
                $("#e_uuid").val(data["employee_id"]);
                $("#e_user_id").val(data["user_id"]).trigger("change");
                $("#e_user_type").val(data["user_type"]).trigger("change");
                $("#e_employee_first_name").val(data["employee_first_name"]);
                $("#e_employee_middle_name").val(data["employee_middle_name"]);
                $("#e_employee_last_name").val(data["employee_first_name"]);
                $("#e_employee_contact").val(data["employee_contact"]);
                $("#e_employee_age").val(data["employee_age"]);
                $("#e_employee_address").val(data["employee_address"]);

                
                var user_id = data["user_id"];
                if (user_id == "" || user_id == null)
                {
                    user_id = null;
                }
                else
                {
                    user_id = data["user_id"]
                }
            
                $("#e_form_id").on("submit", function (e)
                {
                    e.preventDefault()
                    var employee_id = $("#e_uuid").val();
                    var user_id = data["user_id"];
                    if (user_id == "" || user_id == null)
                    {
                        user_id = null;
                    }
                    else
                    {
                        user_id = data["user_id"]
                    };
                    var user_type = $("#e_user_type").val();
                    var employee_first_name = $("#e_employee_first_name").val();
                    var employee_middle_name = $("#e_employee_middle_name").val();
                    var employee_last_name = $("#e_employee_last_name").val();
                    var employee_contact = $("#e_employee_contact").val();
                    var employee_age = $("#e_employee_age").val();
                    var employee_address = $("#e_employee_address").val();
                    

                    $.ajax(
                    {
                        url: apiURL + "employees/" + employee_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "user_id": user_id,
                            "user_type": user_type,
                            "employee_first_name": employee_first_name,
                            "employee_middle_name": employee_middle_name,
                            "employee_last_name": employee_last_name,
                            "employee_contact": employee_contact,
                            "employee_age": employee_age,
                            "employee_address": employee_address,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            $('#form_id').trigger("reset")
                            $('#button_save').prop('disabled', true)
                            notification("success", "Success!", data.message);
                            loadTable();
                            $("#editing_modal").modal('hide')
                        },
                        error: function ({ responseJSON }) 
                        {
                            
                        },
                    });
                });
                $('#button_save').prop('disabled', false)
            }
		},
		error: function (data) {},
	});
};

// // function to delete data
// deleteData = (employee_id) => 
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
// 				url: apiURL + "employees/" + employee_id,
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

deleteData = (employee_id) => 
{
    $("#d_uuid").val(employee_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "employees/" + employee_id,
            type: "DELETE",
            dataType: "json",
            success: function (data) 
            {
                notification("info", "Success!", data.message);
                loadTable();
                loadNotif();
                $("#delete_modal").modal('hide')
            },
            error: function ({ responseJSON }) 
            {
                notification("error", "Error!", "Phone Number is Already Used")
            },
        });
    });
};