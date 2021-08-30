$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var supply_id = $("#uuid").val();
        var supplier_id = $("#supplier_id").val()
        var supply_category_id = $("#supply_category_id").val();
        var supply_name = $("#supply_name").val();
        var supply_quantity = $("#supply_quantity").val();
        var supply_unit_type = $("#supply_unit_type").val();
        var supply_unit_cost = $("#supply_unit_cost").val();
        var supply_description = $("#supply_description").val();
        var supply_reorder_interval = $("#supply_reorder_interval").val();
        var supply_expiration = "2021-08-28T04:29:33.292Z"
        var supply_status = $("#supply_status").val();

        if (supply_id == "")
        {
            $.ajax(
            {
                url: apiURL + "supplies/",
                type: "POST",
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
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "supply_name",
                name: "supply_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_category_id",
                name: "supply_category_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supplier_id",
                name: "supplier_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_quantity",
                name: "supply_quantity",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_unit_type",
                name: "supply_unit_type",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_unit_cost",
                name: "supply_unit_cost",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_description",
                name: "supply_description",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_reorder_interval",
                name: "supply_reorder_interval",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "supply_expiration",
                name: "supply_expiration",
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
                        '<button type="button" onClick="return editData(\'' +
                        aData["supply_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="fas fa-eye font-size-16 align-middle"> View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                        aData["supply_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="fas fa-edit font-size-16 align-middle"> Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["supply_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt font-size-16 align-middle"> Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/supplies/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return viewData(\'' +
                aData["supply_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="fas fa-eye font-size-16 align-middle"> View</i></button> ';
            // edit
            buttons +=
                '<button type="button" data-toggle="modal" data-target="#editing_modal" onClick="return editData(\'' +
                aData["supply_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="fas fa-edit font-size-16 align-middle"> Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["supply_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="fas fa-trash-alt font-size-16 align-middle"> Delete</i></button> ';

            var supply_id = ""

            if(aData["supply_id"] == null)
            {
                supply_id = "null"
            }
            else
            {
                supply_id = aData["supply_id"]
            }
            function intToFloat(num, decPlaces) { return num.toFixed(decPlaces); }

            var unit_cost = intToFloat(aData["supply_unit_cost"], 2);

            $("td:eq(0)", nRow).html(aData["supply_name"]);
            $("td:eq(1)", nRow).html(aData["supply_category_id"]);
            $("td:eq(2)", nRow).html(aData["supplier_id"]);
            $("td:eq(3)", nRow).html(aData["supply_quantity"]);
            $("td:eq(4)", nRow).html(aData["supply_unit_type"]);
            $("td:eq(5)", nRow).html("₱" + unit_cost);
            $("td:eq(6)", nRow).html(aData["supply_description"]);
            $("td:eq(7)", nRow).html(aData["supply_reorder_interval"]);
            $("td:eq(8)", nRow).html(aData["supply_expiration"]);
            $("td:eq(9)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

viewData = (supply_id) => 
{
    window.location.replace(baseURL + 'admin/supplies/'+supply_id);
    console.log(supply_id);
}

loadSuppliers = () => {
    $.ajax({
        url: apiURL + "suppliers",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Suppliers, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.supplier_id +
                    "'>" +
                    dataOptions.supplier_name +
                    "</option>";

                $("#supplier_id").append(options);
                $("#e_supplier_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadSuppliers();

loadSupplyCategories = () => {
    $.ajax({
        url: apiURL + "supply_categories",
        type: "GET",
        dataType: "json",
        success: function (responseData) 
        { 
            $.each(responseData.Supply_Categories, function (i, dataOptions) 
            {
                var options = "";

                options =
                    "<option value='" +
                    dataOptions.supply_category_id +
                    "'>" +
                    dataOptions.supply_category_name +
                    "</option>";

                $("#supply_category_id").append(options);
                $("#e_supply_category_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadSupplyCategories();

// function to edit data
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
deleteData = (supply_id) => 
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
				url: apiURL + "supplies/" + supply_id,
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
	