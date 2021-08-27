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
        order: [[5, "desc"]],
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
                data: "user_id",
                name: "user_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "user_type",
                name: "user_type",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_first_name",
                name: "employee_first_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_middle_name",
                name: "employee_middle_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_last_name",
                name: "employee_last_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_age",
                name: "employee_age",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_contact",
                name: "employee_contact",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "employee_address",
                name: "employee_address",
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
                        aData["employee_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["employee_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["employee_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';
                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/employees/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["employee_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["employee_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // ------------ FOR STATUS -------------------------    
            // if (aData["isActive"] == "Active") 
            // {
            // // delete
            // buttons +=
            //     '<button type="button" onClick="return deleteData(\'' +
            //     aData["employee_id"] +
            //     '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';
            // }
            // ------------ END FOR STATUS ----------------------   
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["employee_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            // var dateCreated = new Date(aData["user_created_date"]);
            // var createdDate = dateCreated.toLocaleString();

            var user_id = ""

            if(aData["user_id"] == null)
            {
                user_id = "null"
            }
            else
            {
                user_id = aData["user_id"]
            }

            $("td:eq(0)", nRow).html(user_id);
            $("td:eq(1)", nRow).html(aData["user_type"]);
            $("td:eq(2)", nRow).html(aData["employee_first_name"]);
            $("td:eq(3)", nRow).html(aData["employee_middle_name"]);
            $("td:eq(4)", nRow).html(aData["employee_last_name"]);
            $("td:eq(5)", nRow).html(aData["employee_age"]);
            $("td:eq(6)", nRow).html(aData["employee_contact"]);
            $("td:eq(7)", nRow).html(aData["employee_address"]);
            $("td:eq(8)", nRow).html(buttons);
        },
        drawCallback: function (settings) {
            // $("#data-table").removeClass("dataTable");
        },
    });
};