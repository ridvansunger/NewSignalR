$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").configureLogging(signalR.LogLevel.Information).build();

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

    const broadcastStreamDataToAllClient = "BroadcastStreamDataToAllClient";
    const receiveMessageAsStreamForAllClient = "ReceiveMessageAsStreamForAllClient";

    const broadcastStreamProductToAllClient = "BroadcastStreamProductToAllClient";
    const receiveProductAsStreamForAllClient = "ReceiveProductAsStreamForAllClient";


    const broadcastFromHubToClient = "BroadcastFromHubToClient";
  

    connection.on(receiveMessageAsStreamForAllClient, (name) => {
        $("#streamBox").append(`<p>${name}</p>`)
    });

    connection.on(receiveProductAsStreamForAllClient, (product) => {
        $("#streamBox").append(`<p>${product.id} - ${product.name} - ${product.price}</p>`)
    });


    $("#btn_FromClient_ToHub").click(function () {

        const names = $("#txt_streams").val();

        const nameAsChunk = names.split(';');

        const subject = new signalR.Subject();

        connection.send(broadcastStreamDataToAllClient, subject).catch(err => console.log(err));

        nameAsChunk.forEach(name => {
            subject.next(name)
        });

        subject.complete();

    })


    $("#btn_FromClient_ToHub2").click(function () {

        const productList = [
            {id:1,name:"pen 1",price:100},
            {id:2,name:"pen 2",price:200},
            {id:3,name:"pen 3",price:300}
        ]
     
        const subject = new signalR.Subject();

        connection.send(broadcastStreamProductToAllClient, subject).catch(err => console.log(err));

        productList.forEach(product => {
            subject.next(product)
        });

        subject.complete();

    })

    $("#btn_FromHubToClient").click(function () {

        connection.stream(broadcastFromHubToClient, 5).subscribe(
            {

                next: (message) => $("#streamBox").append(`<p>${message}</p>`)
            });

    })






    start();

});