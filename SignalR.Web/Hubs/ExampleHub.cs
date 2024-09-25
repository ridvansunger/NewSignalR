using Microsoft.AspNetCore.SignalR;

namespace SignalR.Web.Hubs
{
    public class ExampleHub : Hub
    {
        //bu method js tarafından tetiklenecek,bu metod tetiklenince de js yani client tarafındaki metodu tetikleyecek.
        //mobil, akıllı tv bu metodu teikleyen herhangi bir şey olabilir.
        public async Task BroadcastMessageAllClient(string message)
        {
            //Clients=> bu metodu kim çağırıyorsa, bana bağlı olan tüm clientlara yağ (Clients.All)
            await Clients.All.SendAsync("ReceiveMessageForAllClient",message);
        }


    }
}
