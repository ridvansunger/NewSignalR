namespace SignalR.Web.Hubs
{
    public interface IExampleTypeSafeHub
    {
        Task ReceiveMessageForAllClient(string message);

        Task ReceiveConnenctedClientCountAllClient(int clientCount);
    }
}
