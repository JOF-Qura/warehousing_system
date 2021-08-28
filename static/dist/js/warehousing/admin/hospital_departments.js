$(function() 
{
    loadTable();

     // function to save/update record
     $("#form_id").on("submit", function (e)
     {
         e.preventDefault();
         trimInputFields();
         var hospital_department_id = $("#uuid").val();
         var hospital_manager_id = $("#hospital_manager_id").val()
         var hospital_department_name = $("#hospital_department_name").val()
         var hospital_department_description = $("#hospital_department_description").val();

         if (hospital_department_id == "")
         {
             $.ajax(
             {
                 url: apiURL + "hospital_departments/",
                 type: "POST",
                 data: JSON.stringify(
                 {		
                     "hospital_manager_id": hospital_manager_id,
                     "hospital_department_name": hospital_department_name,
                     "hospital_department_description": hospital_department_description,
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
                data: "hospital_manager_id",
                name: "hospital_manager_id",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "hospital_department_name",
                name: "hospital_department_name",
                searchable: true,
                // width: "6.66%",
                className: "dtr-control",
            },
            {
                data: "hospital_department_description",
                name: "hospital_department_description",
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
                        aData["hospital_department_id"] +
                        '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
                    // edit
                    buttons +=
                        '<button type="button" onClick="return editData(\'' +
                        aData["hospital_department_id"] +
                        '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
                    // delete
                    buttons +=
                        '<button type="button" onClick="return deleteData(\'' +
                        aData["hospital_department_id"] +
                        '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

                    return buttons; // same class in i element removed it from a element
                },
            },
        ],
        ajax: 
        {
            url: '/hospital_departments/datatable',
            type: "GET",
            ContentType: "application/x-www-form-urlencoded",
        },
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) 
        {
            let buttons = "";
            // info
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["hospital_department_id"] +
                '\',0)" class="btn btn-secondary waves-effect"><i class="bx bx-info-circle font-size-16 align-middle">View</i></button> ';
            // edit
            buttons +=
                '<button type="button" onClick="return editData(\'' +
                aData["hospital_department_id"] +
                '\',1)" class="btn btn-info waves-effect"><i class="bx bx-edit font-size-16 align-middle">Edit</i></button> ';
            // delete
            buttons +=
                '<button type="button" onClick="return deleteData(\'' +
                aData["hospital_department_id"] +
                '\')" class="btn btn-danger waves-effect"><i class="bx bx-trash font-size-16 align-middle">Delete</i></button> ';

            var hospital_department_id = ""

            if(aData["hospital_department_id"] == null)
            {
                hospital_department_id = "null"
            }
            else
            {
                hospital_department_id = aData["hospital_department_id"]
            }

            $("td:eq(0)", nRow).html(aData["hospital_department_name"]);
            $("td:eq(1)", nRow).html(aData["hospital_manager_id"]);
            $("td:eq(2)", nRow).html(aData["hospital_department_description"]);
            $("td:eq(4)", nRow).html(buttons);

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

                $("#hospital_manager_id").append(options);
                $("#e_hospital_manager_id").append(options);
            });
            
        },
        error: function ({ responseJSON }) {},
    });
};
loadEmployees();
