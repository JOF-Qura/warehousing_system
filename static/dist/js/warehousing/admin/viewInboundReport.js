$(function() 
{
    // loadTable();
});

// function to view data
viewInboundReportDetails = () =>
{
    $.ajax(
	{
		url: apiURL + "inbound_reports/" + inbound_report_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data)
       
            var requestDate = new Date(data.requested.request_date);
			var DateRequest = requestDate.toLocaleString();

            // console.log(data)

            $("#l_card_header_id").empty();

			var details = "";                                      
            details =
                'Inbound Report ID: <br>' + inbound_report_id;
            $("#l_card_header_id").append(details);


            $("#l_rd_id").empty();

            status = ""

            if (data.status == "On Going")
            {
                status =  '<div class="col-md-9"><span class="badge badge-warning">'+data.status+'</span></div>'
            }
            else if (data.status == "Delivered")
            {
                status =  '<div class="col-md-9"><span class="badge badge-success">'+data.status+'</span></div>'
            }

			var details = "";                                      
            details =                          
                '<div class="col-md-3">' +
                    '<b>Status:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    status +   
                '</div>' +     

                '<div class="col-md-3">' +
                    '<b>Employee:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.emp.employee_last_name + ", " + data.emp.employee_first_name
                '</div>' +

                '<div class="col-md-3">' +
                    '<b>Total Quantity:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.total_quantity +
                '</div>' ;                           
            $("#l_rd_id").append(details);

            $("#r_rd_id").empty();

			var h_details = "";                                      
            h_details =                          
                '<div class="col-md-12">' +
                    '<b>Request ID:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.requested.request_id +   
                '</div>' +     

                '<div class="col-md-12">' +
                    '<b>Requestor:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.requested.requestor +
                '</div>' + 
                
                '<div class="col-md-12">' +
                    '<b>Request Type:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.requested.request_type +
                '</div>' +

                '<div class="col-md-12">' +
                    '<b>Status:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.requested.request_status +
                '</div>' +
                
                '<div class="col-md-12">' +
                    '<b>Request Date:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    DateRequest +
                '</div>';
                                        
            $("#r_rd_id").append(h_details);
        }
    });
}
viewInboundReportDetails();


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
editData = () => 
{
	$.ajax(
		{
		url: apiURL + "inbound_reports/" + inbound_report_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
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
                        "total_quantity": total_quantity,
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
		},
		error: function (data) {},
	});
};

viewRequestDetails = () => 
{
    $.ajax(
    {
        url: apiURL + "inbound_reports/" + inbound_report_id,
        type: "GET",
        dataType: "json",
        success: function (data) 
        {
            window.location.replace(baseURL + 'admin/request_details?request_id='+data.requested.request_id);
            console.log(request_id);
        }
    });
}



// loadSupply = () => {
//     $.ajax({
//         url: apiURL + "supplies",
//         type: "GET",
//         dataType: "json",
//         success: function (responseData) 
//         { 
//             $.each(responseData.Supplies, function (i, dataOptions) 
//             {
//                 var options = "";

//                 options =
//                     "<option value='" +
//                     dataOptions.supply_id +
//                     "'>" +
//                     dataOptions.supply_name +
//                     "</option>";

//                 $("#supply_id").append(options);
//                 $("#e_supply_id").append(options);
//             });
            
//         },
//         error: function ({ responseJSON }) {},
//     });
// };
// loadSupply();



//    $.ajaxSetup(
//     {
// 		headers: 
//         {
// 			Accept: "application/json",
// 			Authorization: "Bearer " + token,
// 			ContentType: "application/x-www-form-urlencoded",
// 		},
// 	});
// loadTable = () => 
// {
//     $("#data-table").dataTable().fnClearTable();
//     $("#data-table").dataTable().fnDraw();
//     $("#data-table").dataTable().fnDestroy();
//     $("#data-table").dataTable({
//         serverSide: true,
//         // scrollX: true,
//         responsive: false,
//         buttons:[
//             {extend: 'excel', text: 'Save to Excel File'}
//         ],
//         order: [[0, "desc"]],
//         aLengthMenu: [5, 10, 20, 30, 50, 100],
//         aaColumns: [
//             { sClass: "text-left" },
//             { sClass: "text-left" },
//             { sClass: "text-left" },,
//             { sClass: "text-center" },
//         ],
//         columns: [
//             {
//                 data: "supply_id",
//                 name: "supply_id",
//                 searchable: true,
//                 // width: "6.66%",
//                 className: "dtr-control",
//             },
//             {
//                 data: "quantity",
//                 name: "quantity",
//                 searchable: true,
//                 // width: "6.66%",
//                 className: "dtr-control",
//             },
//              {
//                 data: "status",
//                 name: "status",
//                 searchable: true,
//                 // width: "6.66%",
//                 className: "dtr-control",
//             },
//             {
//                 data: null,
//                 // width: "30%",
//                 class: "text-center", 
//                 render: function (aData, type, row) 
//                 {
//                     let buttons = "";
//                     // info
//                     // buttons +=
//                     //     '<button type="button" onClick="return viewData(\'' +
//                     //     aData["inbound_report_id"] +
//                     //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
//                     // edit
//                     buttons +=
//                         '<button type="button" onClick="return editData(\'' +
//                         aData["request_details_id"] +
//                         '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
//                     // delete
//                     buttons +=
//                         '<button type="button" onClick="return deleteData(\'' +
//                         aData["request_details_id"] +
//                         '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

//                     return buttons; // same class in i element removed it from a element
//                 },
//             },
//         ],
//         ajax: 
//         {
//             url: '/request_detail/datatable/' + inbound_report_id,
//             type: "GET",
//             ContentType: "application/x-www-form-urlencoded",
//         },
//         fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
//         {
//             let buttons = "";
//             // info
//             // buttons +=
//             //     '<button type="button" onClick="return viewData(\'' +
//             //     aData["request_details_id"] +
//             //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
//             // edit
//             buttons +=
//                 '<button type="button" onClick="return editData(\'' +
//                 aData["request_details_id"] +
//                 '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
//             // delete
//             buttons +=
//                 '<button type="button" onClick="return deleteData(\'' +
//                 aData["request_details_id"] +
//                 '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

//             var DateRequest = new Date(aData["request_date"]);
//             var requestedDate = DateRequest.toLocaleString();

//             $("td:eq(0)", nRow).html(aData["supply_id"]);
//             $("td:eq(1)", nRow).html(aData["quantity"]);
//             $("td:eq(2)", nRow).html(aData["status"]);
//             $("td:eq(3)", nRow).html(buttons);

//         },
//         drawCallback: function (settings) {
//             // $("#data-table").removeClass("dataTable");
//         },
//     });
// };

// viewData = (inbound_report_id) => 
// {
//     window.location.replace(baseURL + 'admin/request_details?inbound_report_id='+inbound_report_id);
//     console.log(inbound_report_id);
// }