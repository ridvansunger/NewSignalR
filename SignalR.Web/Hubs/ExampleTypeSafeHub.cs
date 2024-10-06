
using Microsoft.AspNetCore.SignalR;
using SignalR.Web.Models;

namespace SignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        private static int ConnectedClinetCount = 0;

        public async Task BroadcastMessageAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);
        }

        public async Task BroadcastTypeMessageAllClient(Product product)
        {
            await Clients.All.ReceiveTypeMessageForAllClient(product);
        }

        public async Task BroadcastMessageCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }

        public async Task BroadcastMessageOtherClient(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClient(message);
        }

        public async Task BroadcastMessageIndividualClient(string connectionId, string message)
        {
            await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message);
        }


        //
        public async Task BroadcastMessageToGroupClient(string groupName, string message)
        {
            await Clients.Group(groupName).ReceiveMessageForGroupClient(message);
        }

        //gruba dahil olma
        public async Task AddGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            //iki yer tetiklenmeli 1. gruba dahil oldun 2. diğer clientlara mesaj göndermeli
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} Gruba dahil oldunuz.");

            //sadewce grubuna
            await Clients.Group(groupName).ReceiveMessageForGroupClient($"Kullanıcı ({Context.ConnectionId}) {groupName} dahil oldu.");

            //Diğer herkese
            //await Clients.Others.ReceiveMessageForOtherClient($"Kullanıcı ({Context.ConnectionId}) {groupName} dahil oldu.");
        }

        public async Task RemoveGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Caller.ReceiveMessageForCallerClient($"{groupName} Grubundan çıktınız.");
           
            await Clients.Group(groupName).ReceiveMessageForGroupClient($"Kullanıcı ({Context.ConnectionId}) {groupName} grubundan çıktı.");
            //await Clients.Others.ReceiveMessageForOtherClient($"Kullanıcı ({Context.ConnectionId}) {groupName} grubundan çıktı.");

        }



        public override async Task OnConnectedAsync()
        {
            ConnectedClinetCount++;
            await Clients.All.ReceiveConnenctedClientCountAllClient(ConnectedClinetCount);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            ConnectedClinetCount--;
            await Clients.All.ReceiveConnenctedClientCountAllClient(ConnectedClinetCount);
            await base.OnDisconnectedAsync(exception);
        }

    }
}
