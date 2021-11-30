$(function() 
{
    loadTable();
   

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
                console.log(countRequest)
                count = 0

                if (countRequest.Request_Details.length != 0)
                {
                    count = countRequest.Request_Details.length
                    console.log(count)
                }
                console.log(countRequest)

                if(count > 0)
                {
                    console.log(count)
                    $.ajax(
                    {
                        url: apiURL + "request_detail_count/" + req_id + "/" + supply_id,
                        type: "GET",
                        dataType: "json",
                        success: function (countData) 
                        {
                            console.log(countData)
                            count = 0
        
                            if (countData.length != 0)
                            {
                                count = countData.length
                            }
        
                            if (count > 0)
                            {
                                notification('error', 'Error', 'Supply is already on request list')
                            }
                        },
                        error: function (errData)
                        {
                            console.log(req_id)
                            console.log(supply_id)
                            console.log(quantity)
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
                    });
                }
                else
                {
                    console.log("else")
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

        if (USER_TYPE == "Admin" || USER_TYPE == "Manager")
        {
            if (data.request_type == "To Request")
            {
                if (data.request_status == "Pending")
                {
                    var details = "";                                      
                    details =
                    '<button class="btn btn-primary float-right" onClick="sendRequest()">Send Request</button>'
                    $("#send_request_id").append(details);
                }
                else if(data.request_status == "Delivered")
                {
                    var details = "";                                      
                    details =
                        '<button type="button" onClick="return doneChecking(\'' +
                        data["request_id"] +
                        '\',1)" class="btn btn-primary float-right""><i class="bx bx-check font-size-16 align-middle">Done Checking</i></button> ';
                        
                        // '<button class="btn btn-primary float-right" onClick="doneChecking()">Done Checking</button>'
                    $("#send_request_id").append(details);
                }
                else if (data.request_status == "On Process")
                {
                    var details = "";                                      
                    details =
                    '<button type="button" onClick="return makeItDelivered(\'' +
                        data["request_id"] +
                        '\',1)" class="btn btn-primary float-right""><i class="bx bx-check font-size-16 align-middle">Make it Delivered</i></button> ';
                    $("#send_request_id").append(details);
                }
            }
            else if (data.request_type == "For Request")
            {
                var details = "";  
                if(data.request_status == "Delivered")
                {
                    details = "";
                }         
                else if (data.request_status == "Pending")
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return onProcess()">Make it On Process</button>';
                    // '<button class="btn btn-info float-right"  data-toggle="modal" data-target="#editing_modal" onClick="return editRequest()">Edit Request</button>';
                }  
                else if (data.request_status == "On Process")   
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return onDelivery()">Make it Delivered</button>';
                    // '<button class="btn btn-info float-right"  data-toggle="modal" data-target="#editing_modal" onClick="return editRequest()">Edit Request</button>';
                }                      
                
                $("#send_request_id").append(details);
            }
        }
        else if (USER_TYPE == "Staff")
        {
            if (data.request_type == "To Request")
            {
                var details = "";                                      
                details = 
                    '<button class="btn btn-primary float-right ml-1" onClick="ItemDelivered()">This is Complete and No Damage</button>' + 
                    '<button class="btn btn-warning float-right">Item has damage / Incomplete</button>';
                $("#send_request_id").append(details);
            }
            if (data.request_type == "For Request")
            {
                var details = "";  
                if(data.request_status == "Delivered")
                {
                    details = "";
                }         
                else
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return delivered()">Send Report / Packing is Done</button>';
                }                           
                
                $("#send_request_id").append(details);
            }
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
            else if (data.request_status == "On Process")
            {
                status =  '<div class="col-md-9"><span class="badge badge-info">' + data.request_status + '</span></div>'
            }
            else if (data.request_status == "Delivered")
            {
                status =  '<div class="col-md-9"><span class="badge badge-success">' + data.request_status + '</span></div>'
            }
            else if (data.request_status == "Done Checking")
            {
                status =  '<div class="col-md-9"><span class="badge badge-success"><i class="fas fa-check mr-1"></i>' + data.request_status + '</span></div>'
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

onDelivery = () => 
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes!",
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
                            loadTable();
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

onProcess = () => 
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes!",
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
                    var request_status = "On Process"
        
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
                            loadTable();
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

// supplyButton = () => 
// {
//     button =
//         '<button class="btn btn-primary float-right" data-toggle="modal" data-target="#adding_modal" onclick="return addSupply()">Add Supply Request</button>';
//     $("#add_supply_id").append(button);
// }

// supplyButton();

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

doneChecking = (request_id) =>
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, it's done!",
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
                    var request_status = "Done Checking"
        
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

makeItDelivered = (request_id) =>
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes!",
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
                            loadTable();
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

// function to change status of Supply Requested
sendRequest = (request_details_id, type) => 
{
    Swal.fire(
    {
        title: "Are you sure you?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        confirmButtonText: "Yes, send it!",
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
                    var request_status = "On Process"
        
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
                            loadTable();
                            
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
};

loadTable = () => 
{
    $.ajax(
    {
        url: apiURL + "request/" + request_id,
        type: "GET",
        dataType: "json",
        success: function (data) 
        {
            //IF REQUEST STATUS IS PENDING -------------------------------- 
            if (data.request_status == "Pending")
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
                                console.log(request_id)
                                let buttons = "";
                                if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                                {
                                    buttons +=
                                    '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                                    aData["request_details_id"] +
                                    '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                                    // delete
                                    buttons +=
                                        '<button type="button" onClick="return deleteSupply(\'' +
                                        aData["request_details_id"] +
                                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';
                                }
                                else if (USER_TYPE == "Staff")
                                {
                                    buttons +=
                                        'N/A';
                                }
        
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
                        console.log(aData)
                        let buttons = "";
                        if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                        {
                            buttons +=
                            '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                            aData["request_details_id"] +
                            '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                            // delete
                            buttons +=
                                '<button type="button" onClick="return deleteSupply(\'' +
                                aData["request_details_id"] +
                                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';
                        }
                        else if (USER_TYPE == "Staff")
                        {
                            buttons +=
                                'N/A';
                        }

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

                if (USER_TYPE == "Admin" || USER_TYPE == "Manager")
                {
                    $('#add_supply_id').empty()
                    details = "";
                
                    details = 
                        '<button class="btn btn-primary float-right" data-toggle="modal" data-target="#adding_modal">Add Supply Request</button>';
                    
                    $('#add_supply_id').append(details)
                }
            }

            //On Process Status ---------------------------------------------------
            else if (data.request_status == "On Process")
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
                                console.log(request_id)
                                let buttons = "";
                                if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                                {
                                    console.log(aData.status);
                                    if(data.request_type == "To Request")
                                    {
                                        buttons +=
                                        'N/A';
                                    }
                                    else if(data.request_type == "For Request")
                                    {
                                        if (aData.status == "Ready to Deliver")
                                        {
                                            buttons +=
                                            'N/A';
                                        }
                                        else
                                        {
                                            buttons +=
                                            '<button type="button" onClick="return readyToDeliver(\'' +
                                            aData["request_details_id"] +
                                            '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Ready to Deliver</i></button>';
                                        }
                                    }
                                }
                                else if (USER_TYPE == "Staff")
                                {
                                    console.log(aData.status);
                                    if(data.request_type == "To Request")
                                    {
                                        buttons +=
                                        'N/A';
                                    }
                                    else if(data.request_type == "For Request")
                                    {
                                        if (aData.status == "Ready to Deliver")
                                        {
                                            buttons +=
                                        'N/A';
                                        }
                                        else
                                        {
                                            buttons +=
                                            '<button type="button" onClick="return readyToDeliver(\'' +
                                            aData["request_details_id"] +
                                            '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Ready to Deliver</i></button>';
                                        }
                                    }
                                }
        
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
                        console.log(aData)
                        let buttons = "";
                        if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                        {
                            console.log(aData.status);
                            if(data.request_type == "To Request")
                            {
                                buttons +=
                                'N/A';
                            }
                            else if(data.request_type == "For Request")
                            {
                                if (aData.status == "Ready to Deliver")
                                {
                                    buttons +=
                                'N/A';
                                }
                                else
                                {
                                    buttons +=
                                    '<button type="button" onClick="return readyToDeliver(\'' +
                                    aData["request_details_id"] +
                                    '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Ready to Deliver</i></button>';
                                }
                            }
                        }
                        else if (USER_TYPE == "Staff")
                        {
                            console.log(aData.status);
                            if(data.request_type == "To Request")
                            {
                                buttons +=
                                'N/A';
                            }
                            else if(data.request_type == "For Request")
                            {
                                if (aData.status == "Ready to Deliver")
                                {
                                    buttons +=
                                'N/A';
                                }
                                else
                                {
                                    buttons +=
                                    '<button type="button" onClick="return readyToDeliver(\'' +
                                    aData["request_details_id"] +
                                    '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Ready to Deliver</i></button>';
                                }
                            }
                        }

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
            }

             //Delivered or Done Checking Status ---------------------------------------------------
            else if (data.request_status == "Delivered" || data.request_status == "Done Checking" )
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
                                console.log(request_id)
                                let buttons = "";
                                if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                                {
                                    if(data.request_type == "To Request")
                                    {
                                        if (aData['status'] == "Complete/Good")
                                        {
                                            buttons +=
                                                "N/A";
                                        }
                                        else
                                        {
                                            // info
                                            // buttons +=
                                                //     '<button type="button" onClick="return viewData(\'' +
                                                //     aData["request_details_id"] +
                                                //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                                            // edit
                                            buttons +=
                                                '<button type="button" onClick="return supplyCompleted(\'' +
                                                aData["request_details_id"] +
                                                '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Complete/Good</i></button> ';
                                            // delete
                                            buttons +=
                                                '<button type="button" onClick="return supplyIncomplete(\'' +
                                                aData["request_details_id"] +
                                                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Incomplete/Damaged</i></button> ';
                                        }
                                    }
                                    else if (data.request_type == "For Request")
                                    {
                                        buttons +=
                                            'N/A';
                                    }
                                }
                                else if (USER_TYPE == "Staff")
                                {
                                    buttons +=
                                        'N/A';
                                }
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
                        console.log(aData)
                        let buttons = "";
                        if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                        {
                            if(data.request_type == "To Request")
                            {
                                if (aData['status'] == "Complete/Good")
                                {
                                    buttons +=
                                        "N/A";
                                }
                                else
                                {
                                    // info
                                    // buttons +=
                                        //     '<button type="button" onClick="return viewData(\'' +
                                        //     aData["request_details_id"] +
                                        //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                                    // edit
                                    buttons +=
                                        '<button type="button" onClick="return supplyCompleted(\'' +
                                        aData["request_details_id"] +
                                        '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Complete/Good</i></button> ';
                                    // delete
                                    buttons +=
                                        '<button type="button" onClick="return deleteSupply(\'' +
                                        aData["request_details_id"] +
                                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Incomplete/Damaged</i></button> ';
                                }
                            }
                            else if (data.request_type == "For Request")
                            {
                                buttons +=
                                    'N/A';
                            }
                        }
                        else if (USER_TYPE == "Staff")
                        {
                            buttons +=
                                'N/A';
                        }

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
            }
        }
    });
};

readyToDeliver = (request_details_id, type) => 
{
    console.log(request_details_id);
    console.log(request_id);
	$.ajax(
    {
        url: apiURL + "request_detail/" + request_details_id + "/" + request_id,
        type: "GET",
        dataType: "json",
        success: function (data) 
        {
            console.log(data[0]);
            var req_id = data[0].request_id
            var sup_id = data[0].supply_id
            var qty = data[0].quantity
            var stat = data[0].status
            if (type == 1) 
            {
                console.log(sup_id)
                $.ajax(
                {
                    url: apiURL + "request_detail/" + request_details_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "supply_id": sup_id,
                        "request_id": req_id,
                        "quantity": qty,
                        "status": "Ready to Deliver",
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        $.ajax(
                        {
                            url: apiURL + "supplies/" + sup_id,
                            type: "GET",
                            dataType: "json",
                            success: function (data) 
                            {
                                var sp_id = data["supply_id"]
                                var sp_name = data["supply_name"]
                                var sp_supplier_name = data["supplier_id"]
                                var sp_category = data["supply_category_id"]
                                var sp_quantity = data["supply_quantity"]
                                var sp_unit_type = data["supply_unit_type"]
                                var sp_unit_cost = data["supply_unit_cost"]
                                var sp_description = data["supply_description"]
                                var sp_reorder_interval = data["supply_reorder_interval"]
                                var sp_expiration = data["supply_expiration"]
                                var sp_status = data["supply_status"]
                                
                                $.ajax(
                                {
                                    url: apiURL + "supplies/" + sp_id,
                                    type: "PUT",
                                    data: JSON.stringify(
                                    {		
                                        // "supplier_id": sp_id,
                                        "supply_category_id": sp_category,
                                        "supply_name": sp_name,
                                        "supply_quantity": (sp_quantity - qty),
                                        "supply_unit_type": sp_unit_type,
                                        "supply_unit_cost": sp_unit_cost,
                                        "supply_status": sp_status,
                                        "supply_description": sp_description,
                                        "supply_reorder_interval": sp_reorder_interval,
                                        "supply_expiration": sp_expiration,
                                    }),
                                    dataType: "JSON",
                                    contentType: 'application/json',
                                    processData: false,
                                    cache: false,
                                    success: function (data) 
                                    {
                                        console.log(sp_quantity+qty)
                                        notification("success", "Success!", data.message);
                                        loadTable();
                                    },
                                    error: function ({ responseJSON }) 
                                    {
                                        
                                    },
                                });
                                $('#button_save').prop('disabled', false)
                            },
                            error: function (data) {},
                        });
                    },
                    error: function ({ responseJSON }) 
                    {
                        
                    },
                });
            }
        },
        error: function (data) {},
	});
};



// function to edit data
editSupply = (request_details_id, type) => 
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

                    console.log(request_details_id)
                    console.log(req_id)
                    console.log(supply_id)
                    console.log(quantity)
                    console.log(status)


                    // $.ajax(
                    // {
                    //     url: apiURL + "request_detail/" + request_details_id,
                    //     type: "PUT",
                    //     data: JSON.stringify(
                    //     {		
                    //         // "request_id": req_id,
                    //         // "supply_id": supply_id,
                    //         "quantity": quantity,
                    //         "status": status,
                    //     }),
                    //     dataType: "JSON",
                    //     contentType: 'application/json',
                    //     processData: false,
                    //     cache: false,
                    //     success: function (data) 
                    //     {
                    //         notification("success", "Success!", data.message);
                    //         loadTable();
                    //         $("#editing_supply_modal").modal('hide')
                    //     },
                    //     error: function ({ responseJSON }) 
                    //     {
                            
                    //     },
                    // });
                });
            }
		},
		error: function (data) 
        {
            console.log(data)
        },
	});
};

// viewData = (request_id) => 
// {
//     window.location.replace(baseURL + 'admin/request_details?request_id='+request_id);
//     console.log(request_id);
// }

// function to change status of Supply Requested
supplyCompleted = (request_details_id, type) => 
{
    console.log(request_details_id);
    console.log(request_id);
	$.ajax(
    {
        url: apiURL + "request_detail/" + request_details_id + "/" + request_id,
        type: "GET",
        dataType: "json",
        success: function (data) 
        {
            console.log(data[0]);
            var req_id = data[0].request_id
            var sup_id = data[0].supply_id
            var qty = data[0].quantity
            var stat = data[0].status
            if (type == 1) 
            {
                console.log(sup_id)
                $.ajax(
                {
                    url: apiURL + "request_detail/" + request_details_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "supply_id": sup_id,
                        "request_id": req_id,
                        "quantity": qty,
                        "status": "Complete/Good",
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        $.ajax(
                        {
                            url: apiURL + "supplies/" + sup_id,
                            type: "GET",
                            dataType: "json",
                            success: function (data) 
                            {
                                var sp_id = data["supply_id"]
                                var sp_name = data["supply_name"]
                                var sp_supplier_name = data["supplier_id"]
                                var sp_category = data["supply_category_id"]
                                var sp_quantity = data["supply_quantity"]
                                var sp_unit_type = data["supply_unit_type"]
                                var sp_unit_cost = data["supply_unit_cost"]
                                var sp_description = data["supply_description"]
                                var sp_reorder_interval = data["supply_reorder_interval"]
                                var sp_expiration = "2021-08-28T04:29:33.292Z" 
                                var sp_status = data["supply_status"]
                                
                                $.ajax(
                                {
                                    url: apiURL + "supplies/" + sp_id,
                                    type: "PUT",
                                    data: JSON.stringify(
                                    {		
                                        // "supplier_id": sp_id,
                                        "supply_category_id": sp_category,
                                        "supply_name": sp_name,
                                        "supply_quantity": sp_quantity + qty,
                                        "supply_unit_type": sp_unit_type,
                                        "supply_unit_cost": sp_unit_cost,
                                        "supply_status": sp_status,
                                        "supply_description": sp_description,
                                        "supply_reorder_interval": sp_reorder_interval,
                                        "supply_expiration": sp_expiration,
                                    }),
                                    dataType: "JSON",
                                    contentType: 'application/json',
                                    processData: false,
                                    cache: false,
                                    success: function (data) 
                                    {
                                        console.log(sp_quantity+qty)
                                        notification("success", "Success!", data.message);
                                        loadTable();
                                    },
                                    error: function ({ responseJSON }) 
                                    {
                                        
                                    },
                                });
                                $('#button_save').prop('disabled', false)
                            },
                            error: function (data) {},
                        });
                    },
                    error: function ({ responseJSON }) 
                    {
                        
                    },
                });
            }
        },
        error: function (data) {},
	});
};

// function to change status of Supply Requested
supplyIncompleted = (request_details_id, type) => 
{
    console.log(request_details_id);
    console.log(request_id);
	$.ajax(
    {
        url: apiURL + "request_detail/" + request_details_id + "/" + request_id,
        type: "GET",
        dataType: "json",
        success: function (data) 
        {
            console.log(data[0]);
            var req_id = data[0].request_id
            var sup_id = data[0].supply_id
            var qty = data[0].quantity
            var stat = data[0].status
            if (type == 1) 
            {
                console.log(sup_id)
                $.ajax(
                {
                    url: apiURL + "request_detail/" + request_details_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "supply_id": sup_id,
                        "request_id": req_id,
                        "quantity": qty,
                        "status": "Incomplete/Damaged",
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        $.ajax(
                        {
                            url: apiURL + "supplies/" + sup_id,
                            type: "GET",
                            dataType: "json",
                            success: function (data) 
                            {
                                var sp_id = data["supply_id"]
                                var sp_name = data["supply_name"]
                                var sp_supplier_name = data["supplier_id"]
                                var sp_category = data["supply_category_id"]
                                var sp_quantity = data["supply_quantity"]
                                var sp_unit_type = data["supply_unit_type"]
                                var sp_unit_cost = data["supply_unit_cost"]
                                var sp_description = data["supply_description"]
                                var sp_reorder_interval = data["supply_reorder_interval"]
                                var sp_expiration = "2021-08-28T04:29:33.292Z" 
                                var sp_status = data["supply_status"]
                                
                                $.ajax(
                                {
                                    url: apiURL + "supplies/" + sp_id,
                                    type: "PUT",
                                    data: JSON.stringify(
                                    {		
                                        // "supplier_id": sp_id,
                                        "supply_category_id": sp_category,
                                        "supply_name": sp_name,
                                        "supply_quantity": sp_quantity + qty,
                                        "supply_unit_type": sp_unit_type,
                                        "supply_unit_cost": sp_unit_cost,
                                        "supply_status": sp_status,
                                        "supply_description": sp_description,
                                        "supply_reorder_interval": sp_reorder_interval,
                                        "supply_expiration": sp_expiration,
                                    }),
                                    dataType: "JSON",
                                    contentType: 'application/json',
                                    processData: false,
                                    cache: false,
                                    success: function (data) 
                                    {
                                        console.log(sp_quantity+qty)
                                        notification("success", "Success!", data.message);
                                        loadTable();
                                    },
                                    error: function ({ responseJSON }) 
                                    {
                                        
                                    },
                                });
                                $('#button_save').prop('disabled', false)
                            },
                            error: function (data) {},
                        });
                    },
                    error: function ({ responseJSON }) 
                    {
                        
                    },
                });
            }
        },
        error: function (data) {},
	});
};

editData = (supply_id, type) => 
{
	$.ajax(
		{
		url: apiURL + "supplies/" + supply_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["supply_id"]);
                $("#e_supply_name").val(data["supply_name"]);
                $("#e_supplier_id").val(data["supplier_id"]).trigger("change");
                $("#e_supply_category_id").val(data["supply_category_id"]).trigger("change");
                $("#e_supply_quantity").val(data["supply_quantity"]);
                $("#e_supply_unit_type").val(data["supply_unit_type"]);
                $("#e_supply_unit_cost").val(data["supply_unit_cost"]);
                $("#e_supply_description").val(data["supply_description"]);
                $("#e_supply_reorder_interval").val(data["supply_reorder_interval"]).trigger("change");
                $("#e_supply_expiration").val(data["supply_expiration"]);
                $("#e_supply_status").val(data["supply_status"]).trigger("change");
               
                $("#e_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var supply_id = $("#e_uuid").val();
                    var supplier_id = $("#e_supplier_id").val()
                    var supply_category_id = $("#e_supply_category_id").val();
                    var supply_name = $("#e_supply_name").val();
                    var supply_quantity = $("#e_supply_quantity").val();
                    var supply_unit_type = $("#e_supply_unit_type").val();
                    var supply_unit_cost = $("#e_supply_unit_cost").val();
                    var supply_description = $("#e_supply_description").val();
                    var supply_reorder_interval = $("#e_supply_reorder_interval").val();
                    var supply_expiration = "2021-08-28T04:29:33.292Z"
                    var supply_status = $("#e_supply_status").val();

                    $.ajax(
                    {
                        url: apiURL + "supplies/" + supply_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "supplier_id": supplier_id,
                            "supply_category_id": supply_category_id,
                            "supply_name": supply_name,
                            "supply_quantity": supply_quantity,
                            "supply_unit_type": supply_unit_type,
                            "supply_unit_cost": supply_unit_cost,
                            "supply_status": supply_status,
                            "supply_description": supply_description,
                            "supply_reorder_interval": supply_reorder_interval,
                            "supply_expiration": supply_expiration,
                        }),
                        dataType: "JSON",
                        contentType: 'application/json',
                        processData: false,
                        cache: false,
                        success: function (data) 
                        {
                            $('#button_save').prop('disabled', true)
                            notification("success", "Success!", data.message);
                            loadTable();
                            loadNotif();
                            $("#editing_modal").modal('hide')
                        },
                        error: function ({ responseJSON }) 
                        {
                            
                        },
                    });
                    $('#button_save').prop('disabled', false)
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
                    notification("info", "Success!", data.message);
                    loadTable();
				},
				error: function ({ responseJSON }) {},
			});
		}
	});
};