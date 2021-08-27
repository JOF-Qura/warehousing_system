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
            { sClass: "text-center" },
        ],
        columns: [
            {
                data: "outbound_report_id",
                name: "outbound_report_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "hospital_department_id",
                name: "hospital_department_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_id",
                name: "employee_id",
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
                data: "total_quantity",
                name: "total_quantity",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "expected_shipment_date",
                name: "expected_shipment_date",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "complete_shipment_date",
                name: "complete_shipment_date",
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
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["outbound_report_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["outbound_report_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["outbound_report_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/outbound_reports/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["outbound_report_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["outbound_report_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["outbound_report_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var outbound_report_id = ""

            if(aData["outbound_report_id"] == null)
            {
                outbound_report_id = "null"
            }
            else
            {
                outbound_report_id = aData["outbound_report_id"]
            }

            $("td:eq(0)", nRow).html(outbound_report_id);
            $("td:eq(1)", nRow).html(aData["hospital_department_id"]);
            $("td:eq(2)", nRow).html(aData["employee_id"]);
            $("td:eq(3)", nRow).html(aData["status"]);
            $("td:eq(4)", nRow).html(aData["total_quantity"]);
            $("td:eq(5)", nRow).html(aData["expected_shipment_date"]);
            $("td:eq(6)", nRow).html(aData["complete_shipment_date"]);
            $("td:eq(7)", nRow).html(aData["created_at"]);
            $("td:eq(8)", nRow).html(buttons);

        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};