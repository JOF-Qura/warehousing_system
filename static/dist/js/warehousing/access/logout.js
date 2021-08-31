$(function() 
{
    logout = () =>
    {
        $.ajax(
        {
            url: apiURL + "auth/logout",
            type: "POST",
            success: function (data)
            {
                sessionStorage.removeItem("TOKEN");
                sessionStorage.removeItem("USER_EMAIL");
                sessionStorage.removeItem("USER_TYPE");
                sessionStorage.clear();
                localStorage.clear();
                
                window.location.replace(baseURL );
            }
        })
    }
});


