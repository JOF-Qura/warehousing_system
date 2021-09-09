$(function() 
{
    loadTable();

    addSupply = () =>
    {
        console.log(request_id)
        // function to save/update record
        $("#form_id").on("submit", function (e)
        {
            e.preventDefault();
            trimInputFields();
            var req_id = request_id
            var supply_id = $("#supply_id").val()
            var quantity = $("#quantity").val();

            $.ajax(
            {
                url: apiURL + "request_detail/",
                type: "GET",
                dataType: "json",
                success: function (countRequest) 
                {
                    count = 0

                    if (countRequest.Request_Details.length != 0)
                    {
                        count = countRequest.Request_Details.length
                        console.log(count)
                    }

                    if(count > 0 || count != null || count != undefined)
                    {
                        $.ajax(
                        {
                            url: apiURL + "request_detail_count/" + req_id + "/" + supply_id,
                            type: "GET",
                            dataType: "json",
                            success: function (countData) 
                            {
                                count = 0
            
                                if (countData.length != 0)
                                {
                                    count = countData.length
                                }
            
                                if (count > 0)
                                {
                                    notification('error', 'Error', 'Supply is already on request list')
                                }
                                else
                                {
                                    $.ajax(
                                    {
                                        url: apiURL + "request_detail/",
                                        type: "POST",
                                        data: JSON.stringify(
                                        {		
                                            "request_id": req_id,
                                            "supply_id": supply_id,
                                            "quantity": quantity,
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
                                            viewRequestDetails();
                                            $("#adding_modal").modal('hide')
                                        },
                                        error: function ({ responseJSON }) 
                                        {
                                            
                                        },
                                    });
                                }
                            }
                        });
                    }
                    else
                    {
                        $.ajax(
                        {
                            url: apiURL + "request_detail/",
                            type: "POST",
                            data: JSON.stringify(
                            {		
                                "request_id": req_id,
                                "supply_id": supply_id,
                                "quantity": quantity,
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
                                viewRequestDetails();
                                $("#adding_modal").modal('hide')
                            },
                            error: function ({ responseJSON }) 
                            {
                                
                            },
                        });
                    }
                }
            });
           
        });
    }    
});

// function to view data
viewRequestDetails = () =>
{
    $.ajax(
	{
		url: apiURL + "request/" + request_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data)
            $("#send_request_id").empty();

            if (data.request_type == "To Request")
            {
                var details = "";                                      
                details =
                    '<button class="btn btn-primary float-right">Send Request</button>'
                $("#send_request_id").append(details);
            }
            else if (data.request_type == "For Request")
            {
                var details = "";  
                if(data.request_status == "Delivered")
                {
                    details = "";
                }         
                else
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return delivered()">Done / Delivered</button>' + 
                    '<button class="btn btn-info float-right"  data-toggle="modal" data-target="#editing_modal" onClick="return editRequest()">Edit Request</button>';
                }                           
                
                $("#send_request_id").append(details);
            }
			
            console.log(data)
            var dateCreated = new Date(data.created_at);
			var createdDate = dateCreated.toLocaleString();

            // console.log(data)

            $("#card_header_id").empty();

			var details = "";                                      
            details =
                'Reuqest ID: ' + request_id;
            $("#card_header_id").append(details);


            $("#rd_id").empty();

            status = ""

            if (data.request_status == "Pending")
            {
                status =  '<div class="col-md-9"><span class="badge badge-warning">' + data.request_status + '</span></div>'
            }
            else if (data.request_status == "For Delivery")
            {
                status =  '<div class="col-md-9"><span class="badge badge-info">' + data.request_status + '</span></div>'
            }
            else if (data.request_status == "Delivered")
            {
                status =  '<div class="col-md-9"><span class="badge badge-success">' + data.request_status + '</span></div>'
            }
			var details = "";                                      
            details =                          
                '<div class="col-md-3">' +
                    '<b>Status:</b>' +
                '</div>' +
                status +                    
                '<div class="col-md-3">' +
                    '<b>Request Date:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    createdDate +
                '</div>' +

                '<div class="col-md-3">' +
                    '<b>Requestor:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.requestor +
                '</div>' +    
                    
                '<div class="col-md-3">' +
                    '<b>Request Type:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.request_type;                      
            $("#rd_id").append(details);

            $.ajax(
                {
                url: apiURL + "request_detail/" + request_id,
                type: "GET",
                dataType: "json",
                success: function (RDdata) 
                {
                    lenght = 0;

                    if (RDdata.length != 0)
                    {
                        length = RDdata.length
                    }

                    console.log(RDdata.length)
                    $("#sp_id").empty();
        
                    var details = "";
                    var supplies = "";
                    var div = "";

                    if (length == 0)
                    {
                        details =                                               
                        '<div class="col-md-12">' +
                            '<div class="row">' +
                                '<div class="col-md-3">' +
                                    '<b>Requested Supplies:</b>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-3"> &nbsp;&nbsp;&nbsp;&nbsp;' +
                                    'Please add Supply to Request'
                                '</div>' +
                            '</div>';
                        '</div>';
                        $("#sp_id").append(details + supplies + div);
                    }  
                    if (length > 0)
                    {
                        details =                                               
                        '<div class="col-md-12">' +
                            '<div class="row">' +
                                '<div class="col-md-3">' +
                                    '<b>Requested Supplies:</b>' +
                                '</div>' +
                                '<div class="col-md-9">' +
                                    '<b>Quantity</b>' +
                                '</div>' +
                            '</div>';
                            for(var i=0; i < RDdata.length; i++)
                            {		
                                supplies +=	
                                    '<div class="row">' +
                                        '<div class="col-md-3"> &nbsp;&nbsp;&nbsp;&nbsp;' +
                                            RDdata[i].supply.supply_name +
                                        '</div>' +
                                        '<div class="col-md-9"> &nbsp;&nbsp;' +
                                            'x' + RDdata[i].quantity +
                                        '</div>' +
                                    '</div>';
                            }
                        div =
                        '</div>';
                        $("#sp_id").append(details + supplies + div);
                    } 
                }
            });
        }
    });
}
viewRequestDetails();

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

delivered = () =>
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, it's delivered!",
    })
    .then(function (t) 
    {
        // if user clickes yes, it will change the active status to "Not Active".
        if (t.value) 
        {
            $.ajax(
            {
                url: apiURL + "request/" + request_id,
                type: "GET",
                dataType: "json",
                success: function (data) 
                {
                    
                    var req_id = request_id
                    var requestor = data["requestor"]
                    var request_type = data["request_type"]
                    var request_status = "Delivered"
        
                    $.ajax(
                    {
                        url: apiURL + "request/" + req_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "requestor": requestor,
                            "request_type": request_type,
                            "request_status": request_status,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            notification("success", "Success!", "Delivered");
                            viewRequestDetails();
                            
                        },
                        error: function ({ responseJSON }) 
                        {
                            
                        },
                    }); 
                },
                error: function (data) {},
            });
        }
    });
}


editRequest = () => 
{
    // $("#e_request_statusLabel").hide();
    // $("#e_request_status").hide();
    $.ajax(
		{
		url: apiURL + "request/" + request_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
           
            $("#e_uuid").val(request_id);
            $("#e_requestor").val(data["requestor"]).trigger('change');
            $("#e_request_type").val(data["request_type"]).trigger('change');
            $("#e_request_status").val(data["request_status"]).trigger('change');
            
            $("#e_form_id").on("submit", function (e)
            {
                e.preventDefault();
                trimInputFields();
                var request_id = $("#e_uuid").val();
                var requestor = $("#e_requestor").val()
                var request_type = $("#e_request_type").val()
                var request_status = $("#e_request_status").val()
                

                $.ajax(
                {
                    url: apiURL + "request/" + request_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "requestor": requestor,
                        "request_type": request_type,
                        "request_status": request_status,
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        notification("success", "Success!", data.message);
                        loadTable();
                        viewRequestDetails();
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
}

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
                    //     aData["request_details_id"] +
                    //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                        aData["request_details_id"] +
                        '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Approved</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteSupply(\'' +
                        aData["request_details_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/request_detail/datatable/' + request_id,
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
                '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                aData["request_details_id"] + '\', \'' + aData["request_id"] + 
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteSupply(\'' +
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

// viewData = (request_id) => 
// {
//     window.location.replace(baseURL + 'admin/request_details?request_id='+request_id);
//     console.log(request_id);
// }

// function to edit data
editSupply = (request_details_id, request_id, type) => 
{
	$.ajax(
		{
		url: apiURL + "request_detail/" + request_details_id + "/" + request_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data[0]);
            // var req_id = data[0].request_id
            // var sup_id = data[0].supply_id
            // var qty = data[0].quantity
            // var stat = data[0].status
            if (type == 1) 
            {
                $("#e_uuid").val(data[0]["request_details_id"]);
                $("#e_req_id").val(data[0]["request_id"]);
                $("#e_supply_id").val(data[0]["supply_id"]).trigger('change');
                $("#e_quantity").val(data[0]["quantity"]);
                $("#e_status").val(data[0]["status"]).trigger('change')

                $("#e_supply_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var request_details_id = $("#e_uuid").val();
                    var req_id = $("#e_req_id").val();
                    var supply_id = $("#e_supply_id").val()
                    var quantity = $("#e_quantity").val()
                    var status = $("#e_status").val()

                    $.ajax(
                    {
                        url: apiURL + "request_detail/" + request_details_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            // "request_id": req_id,
                            // "supply_id": supply_id,
                            "quantity": quantity,
                            "status": status,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            notification("success", "Success!", data.message);
                            loadTable();
                            $("#editing_supply_modal").modal('hide')
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
deleteSupply = (request_details_id) => 
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
				url: apiURL + "request_detail/" + request_details_id,
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