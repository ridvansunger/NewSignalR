namespace SignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);

        Task ReceiveConnenctedClientCountAllClient(int clientCount);

        Task ReceiveMessageForCallerClient(string message);

        Task ReceiveMessageForOtherClient(string message);
    }
}
