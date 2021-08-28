$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var supply_category_id = $("#uuid").val();
        var supply_category_name = $("#supply_category_name").val()
        var supply_category_description = $("#supply_category_description").val();

        if (supply_category_id == "")
        {
            $.ajax(
            {
                url: apiURL + "supply_categories/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "supply_category_name": supply_category_name,
                    "supply_category_description": supply_category_description,
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
        scrollX: true,
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
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "supply_category_name",
                name: "supply_category_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_category_description",
                name: "supply_category_description",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
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
                render: function (aData, type, row) 
                {
                    let buttons = "";
                    // info
                    // buttons +=
                    //     '<button type="button" onClick="return editData(\'' +
                    //     aData["supply_category_id"] +
                    //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        aData["supply_category_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["supply_category_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/supply_categories/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            // buttons +=
            //     '<button type="button" onClick="return editData(\'' +
            //     aData["supply_category_id"] +
            //     '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                aData["supply_category_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["supply_category_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var supply_category_id = ""

            if(aData["supply_category_id"] == null)
            {
                supply_category_id = "null"
            }
            else
            {
                supply_category_id = aData["supply_category_id"]
            }

            $("td:eq(0)", nRow).html(aData["supply_category_name"]);
            $("td:eq(1)", nRow).html(aData["supply_category_description"]);
            $("td:eq(2)", nRow).html(aData["created_at"]);
            $("td:eq(3)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

// function to edit data
editData = (supply_category_id, type) => 
{
    $("#e_form_id")[0].reset();
	$.ajax(
		{
		url: apiURL + "supply_categories/" + supply_category_id,
		type: "GET",
		dataType: "json",
		success: function (data) 
		{
            if (type == 1) 
            {
                $("#e_uuid").val(data["supply_category_id"]);
                s = $("#e_supply_category_name").val(data["supply_category_name"]);
                $("#e_supply_category_description").val(data["supply_category_description"]);

                console.log(s)
                
                $("#e_form_id").on("submit", function (e)
                {
                    var supply_category_id = $("#e_uuid").val();
                    var supply_category_name = $("#e_supply_category_name").val()
                    var supply_category_description = $("#e_supply_category_description").val()
                    

                    $.ajax(
                    {
                        url: apiURL + "supply_categories/" + supply_category_id,
                        type: "PUT",
                        data: JSON.stringify(
                        {		
                            "supply_category_name": supply_category_name,
                            "supply_category_description": supply_category_description,
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
deleteData = (supply_category_id) => 
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
				url: apiURL + "supply_categories/" + supply_category_id,
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