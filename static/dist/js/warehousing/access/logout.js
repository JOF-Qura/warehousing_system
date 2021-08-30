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
                localStorage.removeItem("TOKEN");
                localStorage.removeItem("email");
                localStorage.removeItem("type");
                
                window.location.replace(baseURL );
            }
        })
    }
});


