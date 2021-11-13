$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        // alert("This is Submit")
        e.preventDefault();
        trimInputFields();
        
        var inventory_id = $("#uuid").val();
        var inventory_location_id = $("#inventory_location_id").val()
        var supply_id = $("#supply_id").val()


        if (inventory_id == "")
        {
            $.ajax(
            {
                url: apiURL + "inventories/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "inventory_location_id": inventory_location_id,
                    "supply_id": supply_id,
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
            $('#button_add').prop('disabled', true)
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
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "inventory_id",
                name: "inventory_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "inventory_location_id",
                name: "inventory_location_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_id",
                name: "supply_id",
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
                    if (USER_TYPE == "Admin")
                    {
                        buttons +=
                        '<div class="text-center dropdown">' +
                            '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                '<i class="fas fa-ellipsis-v"></i>'  +
                            '</div>' +
                            '<div class="dropdown-menu dropdown-menu-right">'  +
                            //Info
                                '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                aData["inventory_id"] + 
                                '\', 0)">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-eye mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'View Inventory' +
                                    '</div>'  +
                                '</div>'  +
                            // Edit
                                '<div class="dropdown-divider"></div>' +
                                '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                aData["inventory_id"] +
                                '\',1)">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-edit mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'Edit Inventory' +
                                    '</div>'  +
                                '</div>' +
                            // Delete
                                '<div class="dropdown-divider"></div>' +
                                '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                aData["inventory_id"] + 
                                '\')">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-trash-alt mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'Delete Inventory' +
                                    '</div>'  +
                                '</div>'  +
                            '</div>'  +
                        '</div>';
                    }
                    else if ( USER_TYPE == "Manager")
                    {
                        buttons +=
                        '<div class="text-center dropdown">' +
                            '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                '<i class="fas fa-ellipsis-v"></i>'  +
                            '</div>' +
                            '<div class="dropdown-menu dropdown-menu-right">'  +
                            //Info
                                '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                aData["inventory_id"] + 
                                '\', 0)">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-eye mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'View Inventory' +
                                    '</div>'  +
                                '</div>'  +
                            // Edit
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                // aData["inventory_id"] +
                                // '\',1)">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-edit mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Edit Inventory' +
                                //     '</div>'  +
                                // '</div>' +
                            // Delete
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                                // aData["inventory_id"] + 
                                // '\')">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Delete Inventory' +
                                //     '</div>'  +
                                // '</div>'  +
                            '</div>'  +
                        '</div>';
                    }
                    else if (USER_TYPE == "Staff")
                    {
                        buttons +=
                        '<div class="text-center dropdown">' +
                            '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                '<i class="fas fa-ellipsis-v"></i>'  +
                            '</div>' +
                            '<div class="dropdown-menu dropdown-menu-right">'  +
                            //Info
                                '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                aData["inventory_id"] + 
                                '\', 0)">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-eye mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'View Inventory' +
                                    '</div>'  +
                                '</div>'  +
                            // Edit
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                // aData["inventory_id"] +
                                // '\',1)">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-edit mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Edit Inventory' +
                                //     '</div>'  +
                                // '</div>' +
                            // Delete
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                                // aData["inventory_id"] + 
                                // '\')">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Delete Inventory' +
                                //     '</div>'  +
                                // '</div>'  +
                            '</div>'  +
                        '</div>';
                    }

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/inventories/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            if (USER_TYPE == "Admin")
            {
                buttons +=
                '<div class="text-center dropdown">' +
                    '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                        '<i class="fas fa-ellipsis-v"></i>'  +
                    '</div>' +
                    '<div class="dropdown-menu dropdown-menu-right">'  +
                    //Info
                        '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                        aData["inventory_id"] + 
                        '\', 0)">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-eye mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'View Inventory' +
                            '</div>'  +
                        '</div>'  +
                    // Edit
                        '<div class="dropdown-divider"></div>' +
                        '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        aData["inventory_id"] +
                        '\',1)">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-edit mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'Edit Inventory' +
                            '</div>'  +
                        '</div>' +
                    // Delete
                        '<div class="dropdown-divider"></div>' +
                        '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                        aData["inventory_id"] + 
                        '\')">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-trash-alt mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'Delete Inventory' +
                            '</div>'  +
                        '</div>'  +
                    '</div>'  +
                '</div>';
            }
            else if ( USER_TYPE == "Manager")
            {
                buttons +=
                '<div class="text-center dropdown">' +
                    '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                        '<i class="fas fa-ellipsis-v"></i>'  +
                    '</div>' +
                    '<div class="dropdown-menu dropdown-menu-right">'  +
                    //Info
                        '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                        aData["inventory_id"] + 
                        '\', 0)">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-eye mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'View Inventory' +
                            '</div>'  +
                        '</div>'  +
                    // Edit
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        // aData["inventory_id"] +
                        // '\',1)">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-edit mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Edit Inventory' +
                        //     '</div>'  +
                        // '</div>' +
                    // Delete
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                        // aData["inventory_id"] + 
                        // '\')">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Delete Inventory' +
                        //     '</div>'  +
                        // '</div>'  +
                    '</div>'  +
                '</div>';
            }
            else if (USER_TYPE == "Staff")
            {
                buttons +=
                '<div class="text-center dropdown">' +
                    '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                        '<i class="fas fa-ellipsis-v"></i>'  +
                    '</div>' +
                    '<div class="dropdown-menu dropdown-menu-right">'  +
                    //Info
                        '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                        aData["inventory_id"] + 
                        '\', 0)">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-eye mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'View Inventory' +
                            '</div>'  +
                        '</div>'  +
                    // Edit
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        // aData["inventory_id"] +
                        // '\',1)">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-edit mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Edit Inventory' +
                        //     '</div>'  +
                        // '</div>' +
                    // Delete
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                        // aData["inventory_id"] + 
                        // '\')">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Delete Inventory' +
                        //     '</div>'  +
                        // '</div>'  +
                    '</div>'  +
                '</div>';
            }

            var inventory_id = ""

            if(aData["inventory_id"] == null)
            {
                inventory_id = "null"
            }
            else
            {
                inventory_id = aData["inventory_id"]
            }

            $("td:eq(0)", nRow).html(inventory_id);
            $("td:eq(1)", nRow).html(aData["inventory_location_id"]);
            $("td:eq(2)", nRow).html(aData["supply_id"]);
            $("td:eq(3)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

loadSupply = () => {
    $.ajax({
        url: apiURL + "supplies",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Supplies, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.supply_id +
                    "'>" +
                    dataOptions.supply_name +
                    "</option>";

                $("#supply_id").append(options);
                $("#e_supply_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadSupply();

loadInventoryLocation = () => {
    $.ajax({
        url: apiURL + "inventory_locations",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Inventory_Locations, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.inventory_location_id +
                    "'>" +
                    dataOptions.inventory_location_name +
                    "</option>";

                $("#inventory_location_id").append(options);
                $("#e_inventory_location_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadInventoryLocation();

viewData = (inventory_id) => 
{
    if (USER_TYPE == "Admin")
    {
        window.location.replace(baseURL + 'admin/inventories/'+inventory_id);
        console.log(inventory_id);
    }
    else if (USER_TYPE == "Manager")
    {
        window.location.replace(baseURL + 'manager/inventories/'+inventory_id);
        console.log(inventory_id);
    }
    else if (USER_TYPE == "Staff")
    {
        window.location.replace(baseURL + 'staff/inventories/'+inventory_id);
        console.log(inventory_id);
    }
}

// function to edit data
editData = (inventory_id, type) => 
{;
	$.ajax(
		{
		url: apiURL + "inventories/" + inventory_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["inventory_id"]);
                $("#e_inventory_location_id").val(data["inventory_location_id"]).trigger('change');
                $("#e_supply_id").val(data["supply_id"]).trigger('change');

                console.log(s)
                
                $("#e_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var inventory_id = $("#uuid").val();
                    var inventory_location_id = $("#inventory_location_id").val()
                    var supply_id = $("#supply_id").val()
                    

                    $.ajax(
                    {
                        url: apiURL + "inventories/" + inventory_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "inventory_location_id": inventory_location_id,
                            "supply_id": supply_id,
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
		},
		error: function (data) {},
	});
};

// function to delete data
// deleteData = (inventory_id) => 
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
// 				url: apiURL + "inventories/" + inventory_id,
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

deleteData = (inventory_id) => 
{
    $("#d_uuid").val(inventory_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "inventories/" + inventory_id,
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