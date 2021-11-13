$(function() 
{
    
    loadTable();
    console.log(return_id)

    if (USER_TYPE == "Admin" || USER_TYPE == "Manager")
    {
        $('#add_supply_id').empty()
        details = "";
    
        details = 
            '<button class="btn btn-primary float-right" data-toggle="modal" data-target="#adding_modal" onclick="return addSupply()">Add Supply Return</button>';
        
        $('#add_supply_id').append(details)
    }
    
    addSupply = () =>
    {
        console.log(return_id)
        // function to save/update record
        $("#form_id").on("submit", function (e)
        {
            e.preventDefault();
            trimInputFields();
            var ret_id = return_id
            var supply_id = $("#supply_id").val()
            var quantity = $("#quantity").val();

            console.log(ret_id)
            console.log(supply_id)
            console.log(quantity)

            $.ajax(
            {
                url: apiURL + "return_detail/",
                type: "GET",
                dataType: "json",
                success: function (countReturn) 
                {
                    console.log(countReturn)
                    count = 0

                    if (countReturn.Return_Details.length != 0)
                    {
                        count = countReturn.Return_Details.length
                        console.log(count)
                    }
                    console.log(count)
                    

                    if(count > 0)
                    {
                        console.log(count)
                        $.ajax(
                        {
                            url: apiURL + "return_detail_count/" + ret_id + "/" + supply_id,
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
                                    notification('error', 'Error', 'Supply is already on return list')
                                }
                            },
                            error: function (errData)
                            {
                                $.ajax(
                                    {
                                        url: apiURL + "return_detail/",
                                        type: "POST",
                                        data: JSON.stringify(
                                        {		
                                            "return_id": ret_id,
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
                                            viewReturnDetails();
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
                        $.ajax(
                        {
                            url: apiURL + "return_detail/",
                            type: "POST",
                            data: JSON.stringify(
                            {		
                                "return_id": ret_id,
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
                                viewReturnDetails();
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
viewReturnDetails = () =>
{
    $.ajax(
	{
		url: apiURL + "returns/" + return_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(return_id)
            console.log(data)
            $("#send_return_id").empty();

        if (USER_TYPE == "Admin" || USER_TYPE == "Manager")
        {
            if (data.return_type == "To Return")
            {
                var details = "";                                      
                details =
                    '<button class="btn btn-primary float-right">Send Return</button>'
                $("#send_return_id").append(details);
            }
            else if (data.return_type == "For Return")
            {
                var details = "";  
                if(data.return_status == "Delivered")
                {
                    details = "";
                }         
                else
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return delivered()">Done / Delivered</button>' + 
                    '<button class="btn btn-info float-right"  data-toggle="modal" data-target="#editing_modal" onClick="return editReturn()">Edit Return</button>';
                }                           
                
                $("#send_return_id").append(details);
            }
        }
        else if (USER_TYPE == "Staff")
        {
            if (data.return_type == "To Return")
            {
                var details = "";                                      
                details = 
                    '<button class="btn btn-primary float-right ml-1" onClick="ItemDelivered()">This is Complete and No Damage</button>' + 
                    '<button class="btn btn-warning float-right">Item has damage / Incomplete</button>';
                $("#send_return_id").append(details);
            }
            if (data.return_type == "For Return")
            {
                var details = "";  
                if(data.return_status == "Delivered")
                {
                    details = "";
                }         
                else
                {
                    details =
                    '<button class="btn btn-primary float-right" style="margin-left: 1em" onClick="return delivered()">Send Report / Packing is Done</button>';
                }                           
                
                $("#send_return_id").append(details);
            }
        }
           
			
            console.log(data)
            var dateCreated = new Date(data.created_at);
			var createdDate = dateCreated.toLocaleString();

            // console.log(data)

            $("#card_header_id").empty();

			var details = "";                                      
            details =
                'Return ID: ' + return_id;
            $("#card_header_id").append(details);


            $("#rd_id").empty();

            status = ""

            if (data.return_status == "Pending")
            {
                status =  '<div class="col-md-9"><span class="badge badge-warning">' + data.return_status + '</span></div>'
            }
            else if (data.return_status == "For Delivery")
            {
                status =  '<div class="col-md-9"><span class="badge badge-info">' + data.return_status + '</span></div>'
            }
            else if (data.return_status == "Delivered")
            {
                status =  '<div class="col-md-9"><span class="badge badge-success">' + data.return_status + '</span></div>'
            }
			var details = "";                                      
            details =                          
                '<div class="col-md-3">' +
                    '<b>Status:</b>' +
                '</div>' +
                status +                    
                '<div class="col-md-3">' +
                    '<b>Return Date:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    createdDate +
                '</div>' +

                '<div class="col-md-3">' +
                    '<b>Returner:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.returner +
                '</div>' +    
                    
                '<div class="col-md-3">' +
                    '<b>Return Type:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.return_type;                      
            $("#rd_id").append(details);

            $.ajax(
                {
                url: apiURL + "return_detail/" + return_id,
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
                    console.log(RDdata)
                    $("#sp_id").empty();
        
                    var details = "";
                    var supplies = "";
                    var div = "";
                    console.log(RDdata)

                    if (length == 0)
                    {
                        details =                                               
                        '<div class="col-md-12">' +
                            '<div class="row">' +
                                '<div class="col-md-3">' +
                                    '<b>Returned Supplies:</b>' +
                                '</div>' +
                            '</div>' +
                            '<div class="row">' +
                                '<div class="col-md-3"> &nbsp;&nbsp;&nbsp;&nbsp;' +
                                    'Please add Supply to Return'
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
                                    '<b>Returned Supplies:</b>' +
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
                                            RDdata[i].return_supply.supply_name +
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

viewReturnDetails();

loadTable = () => 
{
    console.log(return_id)
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
                    if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                    {
                        // info
                        // buttons +=
                        //     '<button type="button" onClick="return viewData(\'' +
                        //     aData["return_details_id"] +
                        //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                        // edit
                        buttons +=
                            '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                            aData["return_details_id"] +
                            '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Approved</i></button> ';
                        // delete
                        buttons +=
                            '<button type="button" onClick="return deleteSupply(\'' +
                            aData["return_details_id"] +
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
            url: '/return_detail/datatable/' + return_id,
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            if(USER_TYPE == "Admin" || USER_TYPE == "Manager")
                    {
                        // info
                        // buttons +=
                        //     '<button type="button" onClick="return viewData(\'' +
                        //     aData["return_detail_id"] +
                        //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                        // edit
                        buttons +=
                            '<button type="button" data-toggle="modal" data-target="#editing_supply_modal" onClick="return editSupply(\'' +
                            aData["return_detail_id"] +
                            '\',1)" class="btn btn-success waves-effect"><i class="bx bx-edit font-size-16 align-middle">Approved</i></button> ';
                        // delete
                        buttons +=
                            '<button type="button" onClick="return deleteSupply(\'' +
                            aData["return_detail_id"] +
                            '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';
                    }
                    else if (USER_TYPE == "Staff")
                    {
                        buttons +=
                            'N/A';
                    }


            console.log(aData["supply_id"])
            var DateReturn = new Date(aData["return_date"]);
            var returnedDate = DateReturn.toLocaleString();

            $("td:eq(0)", nRow).html(aData["supply_id"]);
            $("td:eq(1)", nRow).html(aData["quantity"]);
            $("td:eq(2)", nRow).html(aData["statuss"]);
            $("td:eq(3)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
            console.log(settings    )
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

// delivered = () =>
// {
//     Swal.fire(
//     {
//         title: "Are you sure you?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: !0,
//         confirmButtonColor: "#34c38f",
//         cancelButtonColor: "#f46a6a",
//         confirmButtonText: "Yes, it's delivered!",
//     })
//     .then(function (t) 
//     {
//         // if user clickes yes, it will change the active status to "Not Active".
//         if (t.value) 
//         {
//             $.ajax(
//             {
//                 url: apiURL + "return/" + return_id,
//                 type: "GET",
//                 dataType: "json",
//                 success: function (data) 
//                 {
                    
//                     var req_id = return_id
//                     var returnor = data["returnor"]
//                     var return_type = data["return_type"]
//                     var return_status = "Delivered"
        
//                     $.ajax(
//                     {
//                         url: apiURL + "return/" + req_id,
//                         type: "PUT",
//                         data: JSON.stringify(
//                         {		
//                             "returnor": returnor,
//                             "return_type": return_type,
//                             "return_status": return_status,
//                         }),
//                         dataType: "JSON",
//                         contentType: 'application/json',
//                         processData: false,
//                         cache: false,
//                         success: function (data) 
//                         {
//                             notification("success", "Success!", "Delivered");
//                             viewReturnDetails();
                            
//                         },
//                         error: function ({ responseJSON }) 
//                         {
                            
//                         },
//                     }); 
//                 },
//                 error: function (data) {},
//             });
//         }
//     });
// }


editReturn = () => 
{
    // $("#e_return_statusLabel").hide();
    // $("#e_return_status").hide();
    $.ajax(
		{
		url: apiURL + "return/" + return_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
           
            $("#e_uuid").val(return_id);
            $("#e_returnor").val(data["returnor"]).trigger('change');
            $("#e_return_type").val(data["return_type"]).trigger('change');
            $("#e_return_status").val(data["return_status"]).trigger('change');
            
            $("#e_form_id").on("submit", function (e)
            {
                e.preventDefault();
                trimInputFields();
                var return_id = $("#e_uuid").val();
                var returnor = $("#e_returnor").val()
                var return_type = $("#e_return_type").val()
                var return_status = $("#e_return_status").val()
                

                $.ajax(
                {
                    url: apiURL + "return/" + return_id,
                    type: "PUT",
                    data: JSON.stringify(
                    {		
                        "returnor": returnor,
                        "return_type": return_type,
                        "return_status": return_status,
                    }),
                    dataType: "JSON",
                    contentType: 'application/json',
                    processData: false,
                    cache: false,
                    success: function (data) 
                    {
                        notification("success", "Success!", data.message);
                        loadTable();
                        viewReturnDetails();
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

// viewData = (return_id) => 
// {
//     window.location.replace(baseURL + 'admin/return_details?return_id='+return_id);
//     console.log(return_id);
// }

// function to edit data
editSupply = (return_details_id, return_id, type) => 
{
	$.ajax(
		{
		url: apiURL + "return_detail/" + return_details_id + "/" + return_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            console.log(data[0]);
            // var req_id = data[0].return_id
            // var sup_id = data[0].supply_id
            // var qty = data[0].quantity
            // var stat = data[0].status
            if (type == 1) 
            {
                $("#e_uuid").val(data[0]["return_details_id"]);
                $("#e_req_id").val(data[0]["return_id"]);
                $("#e_supply_id").val(data[0]["supply_id"]).trigger('change');
                $("#e_quantity").val(data[0]["quantity"]);
                $("#e_status").val(data[0]["status"]).trigger('change')

                $("#e_supply_form_id").on("submit", function (e)
                {
                    e.preventDefault();
                    trimInputFields();
                    var return_details_id = $("#e_uuid").val();
                    var req_id = $("#e_req_id").val();
                    var supply_id = $("#e_supply_id").val()
                    var quantity = $("#e_quantity").val()
                    var status = $("#e_status").val()

                    $.ajax(
                    {
                        url: apiURL + "return_detail/" + return_details_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            // "return_id": req_id,
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
deleteSupply = (return_details_id) => 
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
				url: apiURL + "return_detail/" + return_details_id,
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