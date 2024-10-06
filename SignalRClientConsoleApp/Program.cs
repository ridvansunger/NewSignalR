
using Microsoft.AspNetCore.SignalR.Client;
using SignalRClientConsoleApp;


Console.WriteLine("SignalR Console Client!");

var connection = new HubConnectionBuilder().WithUrl("https://localhost:7109/exampleTypeSafeHub").Build();


connection.StartAsync().ContinueWith((result) =>
{
    Console.WriteLine(result.IsCompletedSuccessfully ? "Connected" : "Connected failed");
});

connection.On<Product>("ReceiveTypeMessageForAllClient", (product) =>
{
    Console.WriteLine($"Received message: {product.Id}-{product.Name}-{product.Price}");
});


while (true)
{
    var key = Console.ReadLine();
    if (key == "exit")
    {
        break;
    }

    var newProduct = new Product(200, "pen 200", 250);

    await connection.InvokeAsync("BroadcastTypeMessageAllClient", newProduct);
}

