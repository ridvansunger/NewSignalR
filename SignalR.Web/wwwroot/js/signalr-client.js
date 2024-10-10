$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").configureLogging(signalR.LogLevel.Information).build(); //back ile client aynı projede olduğu için program csde ki maphub daki adını verdik.
    //configureLogging ile log eklemesi yaptık.

    const broadcastMessageAllClientHubMethodCall = "BroadcastMessageAllClient";//çağrılan method
    const broadcastMessageCallerClient = "BroadcastMessageCallerClient";
    const broadcastMessageOtherClient = "BroadcastMessageOtherClient";

    const receiveMessageForOtherClient = "ReceiveMessageForOtherClient";

    const receiveMessageForCallerClient = "ReceiveMessageForCallerClient";
    const receiveMessageForAllClientClientMethodCall = "ReceiveMessageForAllClient";// çağrılan metdun tetiklediği method.

    const broadcastMessageIndividualClient = "BroadcastMessageIndividualClient";
    const receiveMessageForIndividualClient = "ReceiveMessageForIndividualClient";


    const receiveConnenctedClientCountAllClient = "ReceiveConnenctedClientCountAllClient";


    const receiveTypeMessageForAllClient = "ReceiveTypeMessageForAllClient";
    const broadcastTypeMessageAllClient = "BroadcastTypeMessageAllClient";





    const groupA = "GroupA";
    const groupB = "GroupB";
    let currentGroupList = [];



    async function start() {

        try {

            await connection.start().then(() => {
                console.log("Hub ile bağlantı kuruldu.");
                $("#connectionId").html(`Connection Id: ${connection.connectionId}`);
            });

        } catch (err) {
            console.log("hub ile bağlantı kurulamadı:", err)
            setTimeout(() => start(), 5000);
        }
    }

    connection.onclose(async () => {
        await start();
    })

    start();









    function refreshGroupList() {
        $("#groupList").empty();
        currentGroupList.forEach(x => {
            $("#groupList").append(`<p>${x}</p>`)

        })
    }

    $("#btn-groupA-add").click(function () {

        if (currentGroupList.includes(groupA)) return;

        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();

        })
    })

    $("#btn-groupA-remove").click(function () {
        if (!currentGroupList.includes(groupA)) return;

        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupA);
            refreshGroupList();

        })
    })

    $("#btn-groupB-add").click(function () {
        if (currentGroupList.includes(groupB)) return;
        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();

        })
    })

    $("#btn-groupB-remove").click(function () {
        if (!currentGroupList.includes(groupB)) return;
        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupB);
            refreshGroupList();

        })
    })


    $("#btn-groupA-send-message").click(function () {
        const message = "Group A mesaj";
        connection.invoke("BroadcastMessageToGroupClient", groupA, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    })
    $("#btn-groupA-send-message").click(function () {
        const message = "Group B mesaj";
        connection.invoke("BroadcastMessageToGroupClient", groupB, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    })
    connection.on("ReceiveMessageForGroupClient", (message) => {


        console.log("Connected Client Count:", message);

    });





    var span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnenctedClientCountAllClient, (count) => {

        span_client_count.text(count);
        console.log("Connected Client Count:", count);

    });


    //subscribe olduk burada.
    connection.on(receiveMessageForAllClientClientMethodCall, (message) => {
        console.log("Connected Client Count:", message);
    });

    connection.on(receiveTypeMessageForAllClient, (product) => {
        console.log("Gelen Ürün :", product);
    });


    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("Connected Client Count:", message);
    });

    connection.on(receiveMessageForCallerClient, (message) => {
        console.log("Connected Client Count:", message);
    });

    connection.on(receiveMessageForOtherClient, (message) => {
        console.log("(Others): Gelen Mesaj:", message);
    });

    connection.on(receiveMessageForIndividualClient, (message) => {
        console.log("(Individual): Gelen Mesaj :", message);
    });




    $("#btn-send-message-all-client").click(function () {

        const message = "hello world";
        connection.invoke(broadcastMessageAllClientHubMethodCall, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    });

    $("#btn-send-message-caller-client").click(function () {
        const message = "hello caller";

        connection.invoke(broadcastMessageCallerClient, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    });


    $("#btn-send-message-other-client").click(function () {
        const message = "hello other caller";

        connection.invoke(broadcastMessageOtherClient, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    });

    $("#btn-send-message-individual-client").click(function () {

        const message = "hello specifik caller";
        var connectionId = $("#text-connectionId").val();
        connection.invoke(broadcastMessageIndividualClient, connectionId, message).catch(err => console.log("hata", err));
        console.log("Mesaj Gönderildi");
    });


    $("#btn-send-typed-message-all-client").click(function () {
        const product = { id: 1, name: "Product", price: 200 }

        connection.invoke(broadcastTypeMessageAllClient, product).catch(err => console.log("hata", err));
        console.log("ürün Gönderildi");

    });

});