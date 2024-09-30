
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        private static int ConnectedClinetCount = 0;

        public async Task BroadcastMessageAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);
        }

        public async Task BroadcastMessageCallerClient(string message)
        {
            await Clients.Caller.ReceiveMessageForCallerClient(message);
        }

        public async Task BroadcastMessageOtherClient(string message)
        {
            await Clients.Others.ReceiveMessageForOtherClient(message);
        }

        public async Task BroadcastMessageIndividualClient(string connectionId,string message)
        {
            await Clients.Client(connectionId).ReceiveMessageForIndividualClient(message);
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
