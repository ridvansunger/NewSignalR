﻿
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class ExampleTypeSafeHub : Hub<IExampleTypeSafeHub>
    {
        public async Task BroadcastMessageAllClient(string message)
        {
            await Clients.All.ReceiveMessageForAllClient(message);
        }
    }
}
