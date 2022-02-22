function foo() {
    var day = new Date().getDay();
    var hours = new Date().getHours();
    var month = new Date().getMonth();
    var minutes = new Date().getMinutes();

    document.write('day: ' + day + '  Hours : ' + hours  + '  Minutes : ' + minutes  + '  Month : ' + month + '</br>');

    if (day === 0 && hours > 12 && hours < 13){}
    // Do what you want here:
}

setInterval(foo, 1000);



function getCurrentDate() {
    var dateObj = new Date();
    var month = String(dateObj.getMonth() + 1).padStart(2, '0');
    var day = String(dateObj.getDate()).padStart(2, '0');
    var dayplusone = parseInt(day) + 1;
    var dayplusweek = parseInt(day) + 1;
    var monthplusone = parseInt(month) + 1;
    
    var year = dateObj.getFullYear();
    var today = day + '/' + month + '/' + year;
    var daily = dayplusone + '/' + month + '/' + year;
    var montly = day + '/' + monthplusone + '/' + year;
    
     document.write('Today: ' + today + '</br>' + 'Daily: ' + daily + '</br>' + 'Montly: ' + montly + '</br>');
  }
  setInterval(getCurrentDate, 1000);
  