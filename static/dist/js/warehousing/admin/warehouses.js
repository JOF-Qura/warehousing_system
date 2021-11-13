$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var warehouse_id = $("#uuid").val();
        var warehouse_manager_id = $("#warehouse_manager_id").val()
        var warehouse_name = $("#warehouse_name").val()
        var warehouse_contact = $("#warehouse_contact").val();
        var warehouse_address = $("#warehouse_address").val();
        var warehouse_description = $("#warehouse_description").val();

        if (warehouse_id == "")
        {
            $.ajax(
            {
                url: apiURL + "warehouses/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "warehouse_manager_id": warehouse_manager_id,
                    "warehouse_name": warehouse_name,
                    "warehouse_contact": warehouse_contact,
                    "warehouse_address": warehouse_address,
                    "warehouse_description": warehouse_description,
                }),
                dataType: "JSON",
                contentType: 'application/json',
                processData: false,
                cache: false,
                success: function (data) 
                {
                    $('#form_id').trigger("reset")
                    $('#button_add').prop('disabled', false)
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
        aLengthMenu: [5, 10, 20, 30, 50, 100],
        aaColumns: [
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center" },
        ],
        columns: [

            {
                data: "warehouse_manager_id",
                name: "warehouse_manager_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_name",
                name: "warehouse_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_description",
                name: "warehouse_description",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_address",
                name: "warehouse_address",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_contact",
                name: "warehouse_contact",
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
                    //     aData["warehouse_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Warehouse</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["warehouse_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Warehouse' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["warehouse_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Warehouse' +
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
            url: '/warehouses/datatable',
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
                    //     aData["warehouse_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Warehouse</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["warehouse_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Warehouse' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["warehouse_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Warehouse' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';

            var warehouse_id = ""

            if(aData["warehouse_id"] == null)
            {
                warehouse_id = "null"
            }
            else
            {
                warehouse_id = aData["warehouse_id"]
            }

            $("td:eq(0)", nRow).html(aData["warehouse_name"]);
            $("td:eq(1)", nRow).html(aData["warehouse_manager_id"]);
            $("td:eq(2)", nRow).html(aData["warehouse_description"]);
            $("td:eq(3)", nRow).html(aData["warehouse_address"]);
            $("td:eq(4)", nRow).html(aData["warehouse_contact"]);
            $("td:eq(5)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

loadEmployees = () => {
    $.ajax({
        url: apiURL + "employees",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Employees, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.employee_id +
                    "'>" +
                    dataOptions.employee_first_name +
                    "</option>";

                $("#warehouse_manager_id").append(options);
                $("#e_warehouse_manager_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadEmployees();

// function to edit data
editData = (warehouse_id, type) => 
{
    $("#e_form_id")[0].reset();
	$.ajax(
		{
		url: apiURL + "warehouses/" + warehouse_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["warehouse_id"]);
                $("#e_warehouse_manager_id").val(data.manager["employee_id"]).trigger("change");
                $("#e_warehouse_name").val(data["warehouse_name"]);
                $("#e_warehouse_contact").val(data["warehouse_contact"]);
                $("#e_warehouse_address").val(data["warehouse_address"]);
                $("#e_warehouse_description").val(data["warehouse_description"]);
                
                console.log(data)

                $("#e_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var warehouse_id = $("#e_uuid").val();
                    var warehouse_manager_id = $("#e_warehouse_manager_id").val()
                    var warehouse_name = $("#e_warehouse_name").val()
                    var warehouse_contact = $("#e_warehouse_contact").val()
                    var warehouse_address = $("#e_warehouse_address").val()
                    var warehouse_description = $("#e_warehouse_description").val()                    

                    $.ajax(
                    {
                        url: apiURL + "warehouses/" + warehouse_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "warehouse_manager_id": warehouse_manager_id,
                            "warehouse_name": warehouse_name,
                            "warehouse_contact": warehouse_contact,
                            "warehouse_name": warehouse_name,
                            "warehouse_address": warehouse_address,
                            "warehouse_description": warehouse_description,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            $('#e_form_id').trigger("reset")
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
// deleteData = (warehouse_id) => 
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
// 				url: apiURL + "warehouses/" + warehouse_id,
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
deleteData = (warehouse_id) => 
{
    $("#d_uuid").val(warehouse_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "warehouses/" + warehouse_id,
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