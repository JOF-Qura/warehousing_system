$(function() 
{
    loadTable();
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
                render: function (aData, type, row) 
                {
                    let buttons = "";
                    // info
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["supply_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["supply_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["supply_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

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
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["supply_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["supply_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var supply_id = ""

            if(aData["supply_id"] == null)
            {
                supply_id = "null"
            }
            else
            {
                supply_id = aData["supply_id"]
            }

            $("td:eq(0)", nRow).html(aData["supply_name"]);
            $("td:eq(1)", nRow).html(aData["supply_category_id"]);
            $("td:eq(2)", nRow).html(aData["supplier_id"]);
            $("td:eq(3)", nRow).html(aData["supply_quantity"]);
            $("td:eq(4)", nRow).html(aData["supply_unit_type"]);
            $("td:eq(5)", nRow).html(aData["supply_unit_cost"]);
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
	