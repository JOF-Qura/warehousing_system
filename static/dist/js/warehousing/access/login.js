$(function() 
{
    // function to save/update record
    $("#form_id").on("submit", function (e)
    {
        e.preventDefault();
        // trimInputFields();
        var user_email = $("#user_email").val();
        var user_password = $("#user_password").val()

        $.ajax(
        {
            url: apiURL + "auth/verify",
            type: "POST",
            data: JSON.stringify(
            {		
                "user_email": user_email,
                "user_password": user_password,
            }),
            dataType: "JSON",
            contentType: 'application/json',
            processData: false,
            cache: false,
            success: function (data) 
            {
                console.log(user_email);
                console.log(user_password);
                console.log(data);
                console.log(data.data.user_type)

                localStorage.setItem('TOKEN', data.token);
                localStorage.setItem('USER_EMAIL', data.data.user_email);
                localStorage.setItem('USER_TYPE', data.data.user_type);

                let session_data = "";

                    session_data += 'token=' + data.token;
                    session_data += '&user_email=' + data.data.user_email;
                    session_data += '&user_type=' + data.data.user_type;
                
                // console.log(session_data);

                if (data.data.user_type == "Admin")
                {
                    window.location.replace(baseURL + 'admin');
                }
                else if (data.data.user_type == "Manager")
                {
                    window.location.replace(baseURL + 'manager');
                }
            },
            error: function ({ responseJSON }) 
            {
                
            },
        });
    });
});

