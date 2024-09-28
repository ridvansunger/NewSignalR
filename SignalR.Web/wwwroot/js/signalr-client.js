$(document).ready(function () {

    const broadcastMessageAllClientHubMethodCall = "BroadcastMessageAllClient";//çağrılan method
    const broadcastMessageCallerClient = "BroadcastMessageCallerClient";
    const broadcastMessageOtherClient = "BroadcastMessageOtherClient";

    const receiveMessageForOtherClient = "ReceiveMessageForOtherClient";

    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";// çağrılan metdun tetiklediği method.


    const receiveConnenctedClientCountAllClient = "ReceiveConnenctedClientCountAllClient";



    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").configureLogging(signalR.LogLevel.Information).build(); //back ile client aynı projede olduğu için program csde ki maphub daki adını verdik.
    //configureLogging ile log eklemesi yaptık.



    function start() {
        connection.start().then(() => console.log("Hub ile bağlantı kuruldu."));
    }

    try {
        start();

    } catch (e) {
        setTimeout(() => start(), 5000); //bağlantı kuramazasa 5 saniye de bir bağlantı kurmaya çalışsın.
    }

    var span_client_count = $("#span-connected-client-count");


    //subscribe olduk burada.
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {

      
        console.log("Connected Client Count:", message);

    });


    connection.on(receiveMessageForCallerClient, (message) => {

      
        console.log("Connected Client Count:", message);

    });

    connection.on(receiveMessageForCallerClient, (message) => {

        
        console.log("Connected Client Count:", message);

    });

    connection.on(receiveMessageForOtherClient, (message) => {

      
        console.log("Connected Client Count:", message);

    });

    connection.on(receiveConnenctedClientCountAllClient, (count) => {

        span_client_count.text(count);
        console.log("Connected Client Count:", count);

    });


    $("#btn-send-message-all-client").click(function () {

        const message = "hello world";
        connection.invoke(broadcastMessageAllClientHubMethodCall, message).catch(err => console.log("hata", err));

    });

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello caller";

        connection.invoke(broadcastMessageCallerClient, message).catch(err => console.log("hata", err));
    });


    $("#btn-send-message-other-client").click(function () {
        const message = "hello other caller";

        connection.invoke(broadcastMessageOtherClient, message).catch(err => console.log("hata", err));
    });
});