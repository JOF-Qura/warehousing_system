$(function() 
{
    loadTable();

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
            user_id = data["user_id"]
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
                    $('#form_id').trigger("reset")
                    $('#button_add').prop('disabled', true)
                    notification("success", "Success!", data.message);
                    loadTable();
                    $("#adding_modal").modal('hide')
                },
                error: function ({ responseJSON }) 
                {
                    
                },
            });
        }
        $('#button_add').prop('disabled', false)
    });
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
                    // info
                    // buttons +=
                    //     '<button type="button" onClick="return editData(\'' +
                    //     aData["employee_id"] +
                    //     '\',0)" class="btn btn-secondary waves-effect"><i class="fas fa-eye font-size-16 align-middle"> View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" data-toggle="modal" data-target="#editing_modal"  onClick="return editData(\'' +
                        aData["employee_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="fas fa-edit font-size-16 align-middle"> Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button"  onClick="return deleteData(\'' +
                        aData["employee_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt font-size-16 align-middle"> Delete</i></button> ';
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
            // info
            // buttons +=
            //     '<button type="button" onClick="return editData(\'' +
            //     aData["employee_id"] +
            //     '\',0)" class="btn btn-secondary waves-effect"><i class="fas fa-eye font-size-16 align-middle"> View</i></button> ';
            // edit
            buttons +=
                '<button type="button" data-toggle="modal" data-target="#editing_modal"  onClick="return editData(\'' +
                aData["employee_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="fas fa-edit font-size-16 align-middle"> Edit</i></button> ';
            // ------------ FOR STATUS -------------------------    
            // if (aData["isActive"] == "Active") 
            // {
            // // delete
            // buttons +=
            //     '<button type="button" onClick="return deleteData(\'' +
            //     aData["employee_id"] +
            //     '\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt font-size-16 align-middle"> Delete</i></button> ';
            // }
            // ------------ END FOR STATUS ----------------------   
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["employee_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt font-size-16 align-middle"> Delete</i></button> ';

            // var dateCreated = new Date(aData["user_created_date"]);
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

            var full_name = 

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
    columns.adjust().draw();
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

// function to delete data
deleteData = (employee_id) => 
{
	Swal.fire(
	{
		title: "Are you sure you want to delete this record?",
		text: "You won't be able to revert this!",
		icon: "warning",
		showCancelButton: !0,
		confirmButtonColor: "#34c38f",
		cancelButtonColor: "#f46a6a",
		confirmButtonText: "Yes, delete it!",
	})
	.then(function (t) 
	{
		// if user clickes yes, it will change the active status to "Not Active".
		if (t.value) 
		{
			$.ajax(
				{
				url: apiURL + "users/" + employee_id,
				type: "DELETE",
				dataType: "json",
				success: function (data) 
                {
                    notification("success", "Success!", data.message);
                    loadTable();
				},
				error: function ({ responseJSON }) {},
			});
		}
	});
};