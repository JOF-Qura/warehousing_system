$(function() 
{
    loadTable();

    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        trimInputFields();
        var warehouse_id = $("#uuid").val();
        var warehouse_manager_id = $("#warehouse_manager_id").val()
        var warehouse_name = $("#warehouse_name").val()
        var warehouse_contact = $("#warehouse_contact").val();
        var warehouse_address = $("#warehouse_address").val();
        var warehouse_description = $("#warehouse_description").val();

        if (warehouse_id == "")
        {
            $.ajax(
            {
                url: apiURL + "warehouses/",
                type: "POST",
                data: JSON.stringify(
                {		
                    "warehouse_manager_id": warehouse_manager_id,
                    "warehouse_name": warehouse_name,
                    "warehouse_contact": warehouse_contact,
                    "warehouse_address": warehouse_address,
                    "warehouse_description": warehouse_description,
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
            { sClass: "text-left" },
            { sClass: "text-left" },
            { sClass: "text-center" },
        ],
        columns: [

            {
                data: "warehouse_manager_id",
                name: "warehouse_manager_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_name",
                name: "warehouse_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_description",
                name: "warehouse_description",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_address",
                name: "warehouse_address",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "warehouse_contact",
                name: "warehouse_contact",
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
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["warehouse_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["warehouse_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["warehouse_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/warehouses/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["warehouse_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["warehouse_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["warehouse_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var warehouse_id = ""

            if(aData["warehouse_id"] == null)
            {
                warehouse_id = "null"
            }
            else
            {
                warehouse_id = aData["warehouse_id"]
            }

            $("td:eq(0)", nRow).html(aData["warehouse_name"]);
            $("td:eq(1)", nRow).html(aData["warehouse_manager_id"]);
            $("td:eq(2)", nRow).html(aData["warehouse_description"]);
            $("td:eq(3)", nRow).html(aData["warehouse_address"]);
            $("td:eq(4)", nRow).html(aData["warehouse_contact"]);
            $("td:eq(5)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};

loadEmployees = () => {
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

                $("#warehouse_manager_id").append(options);
                $("#e_warehouse_manager_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadEmployees();
