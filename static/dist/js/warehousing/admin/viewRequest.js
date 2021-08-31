$(function() 
{
    loadTable();

    addSupply = () =>
    {
    $("#request_status").hide();
    $("#request_statusLabel").hide();
    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var request_id = $("#uuid").val();
        var requestor = $("#requestor").val()
        var request_date = "2021-08-28T04:29:33.292Z"
        var request_type = $("#request_type").val();
        var request_status = $("#request_status").val();

        if (request_id == "")
        {
            $.ajax(
            {
                url: apiURL + "request/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "requestor": requestor,
                    "request_date": request_date,
                    "request_type": request_type,
                    "request_status": request_status
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
            var dateCreated = new Date(data.created_at);
			var createdDate = dateCreated.toLocaleString();

            // console.log(data)

            $("#card_header_id").empty();

			var details = "";                                      
            details =
                'Reuqest ID: ' + request_id;
            $("#card_header_id").append(details);


            $("#rd_id").empty();

			var details = "";                                      
            details =                          
                '<div class="col-md-3">' +
                    '<b>Status:</b>' +
                '</div>' +
                '<div class="col-md-9">' +
                    data.request_status +
                '</div>' +                     
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
                    $("#sp_id").empty();
        
                    var details = "";
                    var supplies = "";
                    var div = ""                                      
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
                                            RDdata[i].quantity +
                                        '</div>' +
                                    '</div>';
                            }
                        div =
                        '</div>';
                    $("#sp_id").append(details + supplies + div);
        
        
                    
                }
            });
        }
    });
}
viewRequestDetails();



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
                    //     aData["request_id"] +
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

// viewData = (request_id) => 
// {
//     window.location.replace(baseURL + 'admin/request_details?request_id='+request_id);
//     console.log(request_id);
// }