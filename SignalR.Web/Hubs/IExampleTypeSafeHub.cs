using SignalR.Web.Models;

namespace SignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);

        Task ReceiveTypeMessageForAllClient(Product product);



        Task ReceiveConnenctedClientCountAllClient(int clientCount);

        Task ReceiveMessageForCallerClient(string message);

        Task ReceiveMessageForOtherClient(string message);

        Task ReceiveMessageForIndividualClient(string message);
        Task ReceiveMessageForGroupClient(string message);

    }
}
