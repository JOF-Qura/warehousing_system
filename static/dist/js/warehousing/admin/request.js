$(function() 
{
    loadTable();
    
addData = () =>
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
                    let buttons = "";
                    // info
                    buttons +=
                        '<button type="button" onClick="return viewData(\'' +
                        aData["request_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        aData["request_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["request_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/request/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return viewData(\'' +
                aData["request_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                aData["request_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["request_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var DateRequest = new Date(aData["request_date"]);
            var requestedDate = DateRequest.toLocaleString();

            var request_id = ""

            if(aData["request_id"] == null)
            {
                request_id = "null"
            }
            else
            {
                request_id = aData["request_id"]
            }

            $("td:eq(0)", nRow).html(request_id);
            $("td:eq(1)", nRow).html(requestedDate);
            $("td:eq(2)", nRow).html(aData["requestor"]);
            $("td:eq(3)", nRow).html(aData["request_type"]);
            $("td:eq(4)", nRow).html(aData["request_status"]);
            $("td:eq(5)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

viewData = (request_id) => 
{
    window.location.replace(baseURL + 'admin/request_details?request_id='+request_id);
    console.log(request_id);
}

// function to edit data
editData = (request_id, type) => 
{;
	$.ajax(
		{
		url: apiURL + "request/" + request_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["request_id"]);
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
deleteData = (request_id) => 
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
				url: apiURL + "request/" + request_id,
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
