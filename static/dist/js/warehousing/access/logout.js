$(function() 
{
    logout = () =>
    {
        console.log('Logout')
        // Swal.fire(
        // {
        //     title: "Logout",
        //     text: "Are you sure you want to logout?",
        //     icon: "warning",
        //     showCancelButton: !0,
        //     confirmButtonColor: "#34c38f",
        //     cancelButtonColor: "#f46a6a",
        //     confirmButtonText: "Yes, logout",
        // })
        // .then(function (t) 
        // {
        //     // if user clickes yes, it will change the active status to "Not Active".
        //     if (t.value) 
        //     {
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
                        
                        window.location.replace(apiURL + 'homies');
                    }
                });
    //         }
    //     });
    }
});


