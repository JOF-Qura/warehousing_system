$(function() 
{
    loadTable();

     // function to save/update record
     $("#form_id").on("submit", function (e)
     {
         e.preventDefault();
         trimInputFields();
         var inbound_report_id = $("#uuid").val();
         var request_id = $("#request_id").val()
         var employee_id = $("#employee_id").val();
         var status = $("#status").val();
         var total_quantity = $("#total_quantity").val();

         if (inbound_report_id == "")
         {
             $.ajax(
             {
                 url: apiURL + "inbound_reports/",
                 type: "POST",
                 data: JSON.stringify(
                 {		
                     "request_id": request_id,
                     "employee_id": employee_id,
                     "status": status,
                    //  "total_quantity": total_quantity,
                 }),
                 dataType: "JSON",
                 contentType: 'application/json',
                 processData: false,
                 cache: false,
                 success: function (data) 
                 {
                     console.log(data)
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
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center"},
        ],
        columns: [
            {
                data: "inbound_report_id",
                name: "inbound_report_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "request_id",
                name: "request_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_id",
                name: "employee_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "status",
                name: "status",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            // {
            //     data: "total_quantity",
            //     name: "total_quantity",
            //     searchable: true,
            //     // width: "6.66%",
            //     className: "dtr-control",
            // },
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
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["inbound_report_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Inbound Report' +
                                '</div>'  +
                            '</div>'  +
                        // Edit
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["inbound_report_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Inbound Report' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["inbound_report_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Inbound Report' +
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
            url: '/inbound_reports/datatable',
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
                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                    aData["inbound_report_id"] + 
                    '\', 0)">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-eye mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'View Inbound Report' +
                        '</div>'  +
                    '</div>'  +
                // Edit
                    '<div class="dropdown-divider"></div>' +
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                    aData["inbound_report_id"] +
                    '\',1)">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-edit mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Edit Inbound Report' +
                        '</div>'  +
                    '</div>' +
                // Delete
                    '<div class="dropdown-divider"></div>' +
                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                    aData["inbound_report_id"] + 
                    '\')">'  +
                        '<div style="width: 2rem">' +
                            '<i class="fas fa-trash-alt mr-1"></i>'  +
                        '</div>' +
                        '<div>' +
                            'Delete Inbound Report' +
                        '</div>'  +
                    '</div>'  +
                '</div>'  +
            '</div>';
            var inbound_report_id = ""

            if(aData["inbound_report_id"] == null)
            {
                inbound_report_id = "null"
            }
            else
            {
                inbound_report_id = aData["inbound_report_id"]
            }

            var stats =  aData["status"]

            if (stats == "Delivered")
            {
                stats = '<div class="badge badge-success p-2 w-100"> <i class="fas fa-check mr-1"></i><span>' + aData["status"] + '</span></div>'
            }
           else if (stats == "Pending")
            {
                stats = '<div class="badge badge-warning p-2 w-100"> <i class="fas fa-exclamation mr-1"></i> <span>' + aData["status"] + '</span></div>'
            } 

            $("td:eq(0)", nRow).html(inbound_report_id);
            $("td:eq(1)", nRow).html(aData["request_id"]);
            $("td:eq(2)", nRow).html(aData["employee_id"]);
            $("td:eq(3)", nRow).html(stats);
            // $("td:eq(4)", nRow).html(aData["total_quantity"]);

            
            var date_created = aData["created_at"]
            var moment_date_created = moment(aData["created_at"]).format("MMMM D, YYYY <br> hh:mm:ss");
            var moment_date_created_from_now = moment(aData["created_at"]).fromNow();
            

            if (date_created == "" || date_created == null)
            {
                date_created = "No date hehe"
            }
            else
            {
                date_created = moment_date_created
            }
            $("td:eq(4)", nRow).html(date_created);
            $("td:eq(5)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

loadRequest = () => {
    $.ajax({
        url: apiURL + "request",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Request, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.request_id +
                    "'>" +
                    dataOptions.request_id +
                    "</option>";

                $("#request_id").append(options);
                $("#e_request_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadRequest();

loadEmployee = () => {
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

                $("#employee_id").append(options);
                $("#e_employee_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadEmployee();

// function to edit data
editData = (inbound_report_id, type) => 
{
	$.ajax(
		{
		url: apiURL + "inbound_reports/" + inbound_report_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                console.log(data);
                $("#e_uuid").val(data["inbound_report_id"]);
                $("#e_request_id").val(data["request_id"]).trigger('change');
                $("#e_employee_id").val(data["employee_id"]).trigger('change');
                $("#e_status").val(data["status"]).trigger('change');
                $("#e_total_quantity").val(data["total_quantity"]);

                
                $("#e_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var inbound_report_id = $("#e_uuid").val();
                    var request_id = $("#e_request_id").val()
                    var employee_id = $("#e_employee_id").val()
                    var total_quantity = $("#e_total_quantity").val()
                    var status = $("#e_status").val()
                    

                    $.ajax(
                    {
                        url: apiURL + "inbound_reports/" + inbound_report_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "request_id": request_id,
                            "employee_id": employee_id,
                            // "total_quantity": total_quantity,
                            "status": status,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            console.log(data)
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
// deleteData = (inbound_report_id) => 
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
// 				url: apiURL + "inbound_reports/" + inbound_report_id,
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

deleteData = (inbound_report_id) => 
{
    $("#d_uuid").val(inbound_report_id);

    $("#d_form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        $.ajax(
            {
            url: apiURL + "inbound_reports/" + inbound_report_id,
            type: "DELETE",
            dataType: "json",
            success: function (data) 
            {
                notification("success", "Success!", data.message);
                loadTable();
                loadNotif();
                $("#delete_modal").modal('hide')
            },
            error: function ({ responseJSON }) {},
        });
    });
};


viewData = (inbound_report_id) => 
{
    window.location.replace(baseURL + 'admin/inbound_report_details?inbound_report_id='+inbound_report_id);
    console.log(inbound_report_id);
}