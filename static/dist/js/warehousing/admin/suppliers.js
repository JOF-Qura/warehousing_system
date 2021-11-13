$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var supplier_id = $("#uuid").val();
        var supplier_name = $("#supplier_name").val()
        var supplier_contact = $("#supplier_contact").val();
        var supplier_email = $("#supplier_email").val();
        var supplier_description = $("#supplier_description").val();

        if (supplier_id == "")
        {
            $.ajax(
            {
                url: apiURL + "suppliers/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "supplier_name": supplier_name,
                    "supplier_contact": supplier_contact,
                    "supplier_email": supplier_email,
                    "supplier_description": supplier_description,
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
            $('#button_add').prop('disabled', false)
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
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "supplier_name",
                name: "supplier_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supplier_contact",
                name: "supplier_contact",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supplier_email",
                name: "supplier_email",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supplier_description",
                name: "supplier_description",
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
                    //     aData["supplier_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Supplier</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["supplier_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Supplier' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["supplier_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Supplier' +
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
            url: '/suppliers/datatable',
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
                    //     aData["supplier_id"] +
                    //     '\',0)>'  +
                            //     '<div style="width: 2rem">' +
                            //         '<i class="fas fa-eye mr-1"></i>'  +
                            //     '</div>' +
                            //     '<div>View Supplier</div>'  +
                            // '</div>'  +
                        // Edit
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["supplier_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Supplier' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["supplier_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Supplier' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';

            var supplier_id = ""

            if(aData["supplier_id"] == null)
            {
                supplier_id = "null"
            }
            else
            {
                supplier_id = aData["supplier_id"]
            }

            $("td:eq(0)", nRow).html(aData["supplier_name"]);
            $("td:eq(1)", nRow).html(aData["supplier_contact"]);
            $("td:eq(2)", nRow).html(aData["supplier_email"]);
            $("td:eq(3)", nRow).html(aData["supplier_description"]);
            $("td:eq(4)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

// function to edit data
editData = (supplier_id, type) => 
{
    $("#e_form_id")[0].reset();
	$.ajax(
		{
		url: apiURL + "suppliers/" + supplier_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["supplier_id"]);
                s = $("#e_supplier_name").val(data["supplier_name"]);
                $("#e_supplier_contact").val(data["supplier_contact"]);
                $("#e_supplier_email").val(data["supplier_email"]);
                $("#e_supplier_description").val(data["supplier_description"]);

                console.log(s)
                
                $("#e_form_id").on("submit", function (e)
                {
                    var supplier_id = $("#e_uuid").val();
                    var supplier_name = $("#e_supplier_name").val()
                    var supplier_contact = $("#e_supplier_contact").val()
                    var supplier_email = $("#e_supplier_email").val()
                    var supplier_description = $("#e_supplier_description").val()
                    

                    $.ajax(
                    {
                        url: apiURL + "suppliers/" + supplier_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "supplier_name": supplier_name,
                            "supplier_description": supplier_description,
                            "supplier_contact": supplier_contact,
                            "supplier_email": supplier_email,
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
// deleteData = (supplier_id) => 
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
// 				url: apiURL + "suppliers/" + supplier_id,
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

deleteData = (supplier_id) => 
{
    $("#d_uuid").val(supplier_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "suppliers/" + supplier_id,
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