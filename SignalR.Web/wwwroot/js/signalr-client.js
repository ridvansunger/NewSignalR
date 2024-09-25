$(document).ready(function () {



    const connection = new signalR.HubConnectionBuilder().withUrl("/examplehub").configureLogging(signalR.LogLevel.Information).build(); //back ile client aynı projede olduğu için program csde ki maphub daki adını verdik.
    //configureLogging ile log eklemesi yaptık.



    function start() {
        connection.start().then(() => console.log("Hub ile bağlantı kuruldu."));
    }

    try {
        start();

    } catch (e)
    {
        setTimeout(() => start(), 5000); //bağlantı kuramazasa 5 saniye de bir bağlantı kurmaya çalışsın.
    }

});