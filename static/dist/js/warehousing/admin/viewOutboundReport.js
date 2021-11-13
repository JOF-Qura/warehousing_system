$(function() 
{
    // loadTable();
});

// function to view data
viewOutboundReportDetails = () =>
{
    $.ajax(
	{
		url: apiURL + "outbound_reports/" + outbound_report_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data)
       
            var dateCreated = new Date(data.created_at);
			var createdDate = dateCreated.toLocaleString();

            var expectedShipmentDate = new Date(data.expected_shipment_date);
			var shipmentDate = expectedShipmentDate.toLocaleString();

            var completeShipmentDate = new Date(data.complete_shipment_date);
			var completeDate = completeShipmentDate.toLocaleString();

            // console.log(data)

            $("#l_card_header_id").empty();

			var details = "";                                      
            details =
                'Outbound Report ID: ' + outbound_report_id;
            $("#l_card_header_id").append(details);


            $("#l_rd_id").empty();

            status = ""

            if (data.status == "On Going")
            {
                status =  '<div class="col-md-9"><span class="badge badge-warning">'+data.status+'</span></div>'
            }
            else if (data.status == "Approved")
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
                    '<b>Driver:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.employee.employee_last_name +
                '</div>' +

                '<div class="col-md-3">' +
                    '<b>Expected Shipment Date:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.expected_shipment_date +
                '</div>' + 
                
                '<div class="col-md-3">' +
                    '<b>Complete Shipment Date:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.complete_shipment_date +
                '</div>';
                                        
            $("#l_rd_id").append(details);

            $("#r_rd_id").empty();

			var h_details = "";                                      
            h_details =                          
                '<div class="col-md-12">' +
                    '<b>Hospital Department Name:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.hospital_department.hospital_department_name +   
                '</div>' +     

                '<div class="col-md-12">' +
                    '<b>Description:</b>' +
                '</div>' +
                '<div class="col-md-12"> -- ' +
                    data.hospital_department.hospital_department_description +
                '</div>';
                                        
            $("#r_rd_id").append(h_details);
        }
    });
}
viewOutboundReportDetails();

loadHospitalDepartment = () => {
    $.ajax({
        url: apiURL + "hospital_departments",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Hospital_Departments, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.hospital_department_id +
                    "'>" +
                    dataOptions.hospital_department_name +
                    "</option>";

                $("#hospital_department_id").append(options);
                $("#e_hospital_department_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadHospitalDepartment();

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
		url: apiURL + "outbound_reports/" + outbound_report_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data);
            $("#e_uuid").val(data["outbound_report_id"]);
            $("#e_hospital_department_id").val(data["hospital_department_id"]).trigger('change');
            $("#e_employee_id").val(data["employee_id"]).trigger('change');
            $("#e_status").val(data["status"]).trigger('change');
            $("#e_total_quantity").val(data["total_quantity"]);
            $("#e_expected_shipment_date").val(data["expected_shipment_date"]).trigger('change');
            $("#e_complete_shipment_date").val(data["complete_shipment_date"]).trigger('change');

            
            $("#e_form_id").on("submit", function (e)
            {
                e.preventDefault();
                trimInputFields();
                var outbound_report_id = $("#e_uuid").val();
                var hospital_department_id = $("#e_hospital_department_id").val()
                var employee_id = $("#e_employee_id").val()
                var status = $("#e_status").val()
                var expected_shipment_date = "2021-08-28T04:29:33.292Z"
                var complete_shipment_date = "2021-08-28T04:29:33.292Z"
                

                $.ajax(
                {
                    url: apiURL + "outbound_reports/" + outbound_report_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "hospital_department_id": hospital_department_id,
                        "employee_id": employee_id,
                        "status": status,
                        "expected_shipment_date": expected_shipment_date,
                        "complete_shipment_date": complete_shipment_date
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
		},
		error: function (data) {},
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
            { sClass: "text-left" },,
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "supply_id",
                name: "supply_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "quantity",
                name: "quantity",
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
            {
                data: null,
                // width: "30%",
                class: "text-center", 
                render: function (aData, type, row) 
                {
                    let buttons = "";
                    // info
                    // buttons +=
                    //     '<button type="button" onClick="return viewData(\'' +
                    //     aData["outbound_report_id"] +
                    //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["request_details_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["request_details_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/request_detail/datatable/' + outbound_report_id,
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            // buttons +=
            //     '<button type="button" onClick="return viewData(\'' +
            //     aData["request_details_id"] +
            //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["request_details_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["request_details_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var DateRequest = new Date(aData["request_date"]);
            var requestedDate = DateRequest.toLocaleString();

            $("td:eq(0)", nRow).html(aData["supply_id"]);
            $("td:eq(1)", nRow).html(aData["quantity"]);
            $("td:eq(2)", nRow).html(aData["status"]);
            $("td:eq(3)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

// viewData = (outbound_report_id) => 
// {
//     window.location.replace(baseURL + 'admin/request_details?outbound_report_id='+outbound_report_id);
//     console.log(outbound_report_id);
// }