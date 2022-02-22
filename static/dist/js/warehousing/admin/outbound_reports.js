$(function() 
{
    loadTable();

     // function to save/update record
     $("#form_id").on("submit", function (e)
     {
         e.preventDefault();
         trimInputFields();
         var outbound_report_id = $("#uuid").val();
         var hospital_department_id = $("#hospital_department_id").val()
         var employee_id = $("#employee_id").val();
         var status = $("#status").val();
         var total_quantity = $("#total_quantity").val();
         var complete_shipment_date = $("#expected_shipment_date").val();
         var expected_shipment_date = $("#complete_shipment_date").val();

         var date_complete = complete_shipment_date + "T00:00:00.000Z"
         var date_expected = expected_shipment_date + "T00:00:00.000Z"



 
 
         if (outbound_report_id == "")
         {
             $.ajax(
             {
                 url: apiURL + "outbound_reports/",
                 type: "POST",
                 data: JSON.stringify(
                 {		
                     "hospital_department_id": hospital_department_id,
                     "employee_id": employee_id,
                     "status": status,
                     "total_quantity": total_quantity,
                     "expected_shipment_date": date_expected,
                     "complete_shipment_date": date_complete,
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
        order: [[1, "desc"]],
        aLengthMenu: [10, 20, 30, 40, 50, 100],
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
                data: "request_id",
                name: "request_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "request_date",
                name: "request_date",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
             {
                data: "requestor",
                name: "requestor",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "request_type",
                name: "request_type",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "request_status",
                name: "request_status",
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
                    console.log(aData)
                    let buttons = "";
                    if (USER_TYPE == "Admin")
                    {
                        if(aData["request_status"] == "Delivered")
                        {
                            buttons +=
                            '<div class="text-center dropdown">' +
                                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                    '<i class="fas fa-ellipsis-v"></i>'  +
                                '</div>' +
                                '<div class="dropdown-menu dropdown-menu-right">'  +
                                //Info
                                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                    aData["request_id"] + 
                                    '\', 0)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-eye mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'View Request' +
                                        '</div>'  +
                                    '</div>'  +
                                // // Edit
                                //     '<div class="dropdown-divider"></div>' +
                                //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                //     aData["request_id"] +
                                //     '\',1)">'  +
                                //         '<div style="width: 2rem">' +
                                //             '<i class="fas fa-edit mr-1"></i>'  +
                                //         '</div>' +
                                //         '<div>' +
                                //             'Edit Request' +
                                //         '</div>'  +
                                //     '</div>' +
                                // // // Delete
                                //     '<div class="dropdown-divider"></div>' +
                                //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                //     aData["request_id"] + 
                                //     '\')">'  +
                                //         '<div style="width: 2rem">' +
                                //             '<i class="fas fa-trash-alt mr-1"></i>'  +
                                //         '</div>' +
                                //         '<div>' +
                                //             'Delete Request' +
                                //         '</div>'  +
                                //     '</div>'  +
                                '</div>'  +
                            '</div>';
                        }
                        else
                        {
                            buttons +=
                            '<div class="text-center dropdown">' +
                                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                    '<i class="fas fa-ellipsis-v"></i>'  +
                                '</div>' +
                                '<div class="dropdown-menu dropdown-menu-right">'  +
                                //Info
                                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                    aData["request_id"] + 
                                    '\', 0)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-eye mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'View Request' +
                                        '</div>'  +
                                    '</div>'  +
                                // Edit
                                    '<div class="dropdown-divider"></div>' +
                                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                    aData["request_id"] +
                                    '\',1)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-edit mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'Edit Request' +
                                        '</div>'  +
                                    '</div>' +
                                // Delete
                                    '<div class="dropdown-divider"></div>' +
                                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                    aData["request_id"] + 
                                    '\')">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-trash-alt mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'Delete Request' +
                                        '</div>'  +
                                    '</div>'  +
                                '</div>'  +
                            '</div>';
                        }
                    }
                    else if (USER_TYPE == "Manager")
                    {
                        
                        if(aData["request_status"] == "Delivered")
                        {
                            buttons +=
                            '<div class="text-center dropdown">' +
                                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                    '<i class="fas fa-ellipsis-v"></i>'  +
                                '</div>' +
                                '<div class="dropdown-menu dropdown-menu-right">'  +
                                //Info
                                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                    aData["request_id"] + 
                                    '\', 0)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-eye mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'View Request' +
                                        '</div>'  +
                                    '</div>'  +
                                // // Edit
                                //     '<div class="dropdown-divider"></div>' +
                                //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                //     aData["request_id"] +
                                //     '\',1)">'  +
                                //         '<div style="width: 2rem">' +
                                //             '<i class="fas fa-edit mr-1"></i>'  +
                                //         '</div>' +
                                //         '<div>' +
                                //             'Edit Request' +
                                //         '</div>'  +
                                //     '</div>' +
                                // // // Delete
                                //     '<div class="dropdown-divider"></div>' +
                                //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                //     aData["request_id"] + 
                                //     '\')">'  +
                                //         '<div style="width: 2rem">' +
                                //             '<i class="fas fa-trash-alt mr-1"></i>'  +
                                //         '</div>' +
                                //         '<div>' +
                                //             'Delete Request' +
                                //         '</div>'  +
                                //     '</div>'  +
                                '</div>'  +
                            '</div>';
                        }
                        else
                        {
                            buttons +=
                            '<div class="text-center dropdown">' +
                                '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                                    '<i class="fas fa-ellipsis-v"></i>'  +
                                '</div>' +
                                '<div class="dropdown-menu dropdown-menu-right">'  +
                                //Info
                                    '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                                    aData["request_id"] + 
                                    '\', 0)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-eye mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'View Request' +
                                        '</div>'  +
                                    '</div>'  +
                                // Edit
                                    '<div class="dropdown-divider"></div>' +
                                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                    aData["request_id"] +
                                    '\',1)">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-edit mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'Edit Request' +
                                        '</div>'  +
                                    '</div>' +
                                // Delete
                                    '<div class="dropdown-divider"></div>' +
                                    '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                                    aData["request_id"] + 
                                    '\')">'  +
                                        '<div style="width: 2rem">' +
                                            '<i class="fas fa-trash-alt mr-1"></i>'  +
                                        '</div>' +
                                        '<div>' +
                                            'Delete Request' +
                                        '</div>'  +
                                    '</div>'  +
                                '</div>'  +
                            '</div>';
                        }
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
                                aData["request_id"] + 
                                '\', 0)">'  +
                                    '<div style="width: 2rem">' +
                                        '<i class="fas fa-eye mr-1"></i>'  +
                                    '</div>' +
                                    '<div>' +
                                        'View Request' +
                                    '</div>'  +
                                '</div>'  +
                            // Edit
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                                // aData["request_id"] +
                                // '\',1)">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-edit mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Edit Request' +
                                //     '</div>'  +
                                // '</div>' +
                            // Delete
                                // '<div class="dropdown-divider"></div>' +
                                // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                                // aData["request_id"] + 
                                // '\')">'  +
                                //     '<div style="width: 2rem">' +
                                //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                                //     '</div>' +
                                //     '<div>' +
                                //         'Delete Request' +
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
            url: '/request_filter/datatable/filter_to_for_request_type',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            if (USER_TYPE == "Admin")
            {
                if(aData["request_status"] == "Delivered")
                {
                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["request_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Request' +
                                '</div>'  +
                            '</div>'  +
                        // // Edit
                        //     '<div class="dropdown-divider"></div>' +
                        //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        //     aData["request_id"] +
                        //     '\',1)">'  +
                        //         '<div style="width: 2rem">' +
                        //             '<i class="fas fa-edit mr-1"></i>'  +
                        //         '</div>' +
                        //         '<div>' +
                        //             'Edit Request' +
                        //         '</div>'  +
                        //     '</div>' +
                        // // // Delete
                        //     '<div class="dropdown-divider"></div>' +
                        //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                        //     aData["request_id"] + 
                        //     '\')">'  +
                        //         '<div style="width: 2rem">' +
                        //             '<i class="fas fa-trash-alt mr-1"></i>'  +
                        //         '</div>' +
                        //         '<div>' +
                        //             'Delete Request' +
                        //         '</div>'  +
                        //     '</div>'  +
                        '</div>'  +
                    '</div>';
                }
                else
                {
                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["request_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Request' +
                                '</div>'  +
                            '</div>'  +
                        // Edit
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["request_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Request' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["request_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Request' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';
                }
            }
            else if (USER_TYPE == "Manager")
            {
                if(aData["request_status"] == "Delivered")
                {
                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["request_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Request' +
                                '</div>'  +
                            '</div>'  +
                        // // Edit
                        //     '<div class="dropdown-divider"></div>' +
                        //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        //     aData["request_id"] +
                        //     '\',1)">'  +
                        //         '<div style="width: 2rem">' +
                        //             '<i class="fas fa-edit mr-1"></i>'  +
                        //         '</div>' +
                        //         '<div>' +
                        //             'Edit Request' +
                        //         '</div>'  +
                        //     '</div>' +
                        // // // Delete
                        //     '<div class="dropdown-divider"></div>' +
                        //     '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                        //     aData["request_id"] + 
                        //     '\')">'  +
                        //         '<div style="width: 2rem">' +
                        //             '<i class="fas fa-trash-alt mr-1"></i>'  +
                        //         '</div>' +
                        //         '<div>' +
                        //             'Delete Request' +
                        //         '</div>'  +
                        //     '</div>'  +
                        '</div>'  +
                    '</div>';
                }
                else
                {
                    buttons +=
                    '<div class="text-center dropdown">' +
                        '<div class="btn btn-sm btn-default" data-toggle="dropdown" role="button">'  +
                            '<i class="fas fa-ellipsis-v"></i>'  +
                        '</div>' +
                        '<div class="dropdown-menu dropdown-menu-right">'  +
                        //Info
                            '<div class="dropdown-item d-flex" role="button" onClick="return viewData(\'' + 
                            aData["request_id"] + 
                            '\', 0)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-eye mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'View Request' +
                                '</div>'  +
                            '</div>'  +
                        // Edit
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                            aData["request_id"] +
                            '\',1)">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-edit mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Edit Request' +
                                '</div>'  +
                            '</div>' +
                        // Delete
                            '<div class="dropdown-divider"></div>' +
                            '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#delete_modal" onClick="return deleteData(\'' + 
                            aData["request_id"] + 
                            '\')">'  +
                                '<div style="width: 2rem">' +
                                    '<i class="fas fa-trash-alt mr-1"></i>'  +
                                '</div>' +
                                '<div>' +
                                    'Delete Request' +
                                '</div>'  +
                            '</div>'  +
                        '</div>'  +
                    '</div>';
                }
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
                        aData["request_id"] + 
                        '\', 0)">'  +
                            '<div style="width: 2rem">' +
                                '<i class="fas fa-eye mr-1"></i>'  +
                            '</div>' +
                            '<div>' +
                                'View Request' +
                            '</div>'  +
                        '</div>'  +
                    // Edit
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        // aData["request_id"] +
                        // '\',1)">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-edit mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Edit Request' +
                        //     '</div>'  +
                        // '</div>' +
                    // Delete
                        // '<div class="dropdown-divider"></div>' +
                        // '<div class="dropdown-item d-flex" role="button" onClick="return deleteData(\'' + 
                        // aData["request_id"] + 
                        // '\')">'  +
                        //     '<div style="width: 2rem">' +
                        //         '<i class="fas fa-trash-alt mr-1"></i>'  +
                        //     '</div>' +
                        //     '<div>' +
                        //         'Delete Request' +
                        //     '</div>'  +
                        // '</div>'  +
                    '</div>'  +
                '</div>';
            }


            var DateRequest = new Date(aData["request_date"]);
            var requestedDate = DateRequest.toLocaleString();

            var request_id = ""
            var stats = aData["request_status"];

            console.log(stats)

            if (stats == "Delivered")
            {
                stats = '<div class="badge badge-info p-2 w-100"> <i class="fas fa-check mr-1"></i><span>' + aData["request_status"] + '</span></div>'
            }
            else if (stats == "On Process")
            {
                stats = '<div class="badge badge-Primary p-2 w-100"> <i class="fas fa-check mr-1"></i><span>' + aData["request_status"] + '</span></div>'
            }
            else if (stats == "Done Checking")
            {
                stats = '<div class="badge badge-success p-2 w-100"> <i class="fas fa-check mr-1"></i><span>' + aData["request_status"] + '</span></div>'
            }
            else if (stats == "Pending")
            {
                stats = '<div class="badge badge-warning p-2 w-100"> <i class="fas fa-exclamation mr-1"></i> <span>' + aData["request_status"] + '</span></div>'
            }

            console.log(stats)

            if(aData["request_id"] == null)
            {
                request_id = "null"
            }
            else
            {
                request_id = aData["request_id"]
            }

            $("td:eq(0)", nRow).html(request_id);

            
            var date_request = aData["request_date"]
            var moment_date_request = moment(aData["request_date"]).format("MMMM D, YYYY <br> hh:mm:ss");
            var moment_date_request_from_now = moment(aData["request_date"]).fromNow();
            

            if (date_request == "" || date_request == null)
            {
                date_request = "No date hehe"
            }
            else
            {
                date_request = moment_date_request
            }

            $("td:eq(1)", nRow).html(date_request);
            $("td:eq(2)", nRow).html(aData["requestor"]);
            $("td:eq(3)", nRow).html(aData["request_type"]);


            $("td:eq(4)", nRow).html(stats);

            // if (aData["request_status"] == "Delivered")
            // {
            //     $("td:eq(5)", nRow).html("N/A");
            // }
            // else
            // {
                $("td:eq(5)", nRow).html(buttons);
            // }
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

viewData = (request_id) => 
{
    if(USER_TYPE == "Admin")
    {
        window.location.replace(baseURL + 'admin/request_details?request_id='+request_id);
        console.log(request_id);
    }
    else if(USER_TYPE == "Manager")
    {
        window.location.replace(baseURL + 'manager/request_details?request_id='+request_id);
        console.log(request_id);
    }
    else if(USER_TYPE == "Staff")
    {
        window.location.replace(baseURL + 'staff/request_details?request_id='+request_id);
        console.log(request_id);
    }
}

