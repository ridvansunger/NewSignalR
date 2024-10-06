using Microsoft.AspNetCore.SignalR.Client;

namespace SignalRClientWorkerServiceAppp
{
    public class Worker(ILogger<Worker> logger, IConfiguration configuration) : BackgroundService
    {
        //private readonly ILogger<Worker> _logger;
        //private readonly IConfiguration _configuration;
        //public Worker(ILogger<Worker> logger, IConfiguration configuration)
        //{
        //    _logger = logger;
        //    _configuration = configuration;
        //}


        private HubConnection? connection;

        public override Task StartAsync(CancellationToken cancellationToken)
        {

            connection = new HubConnectionBuilder().WithUrl(configuration.GetSection("SignalR")["Hub"]!).Build();


            connection?.StartAsync().ContinueWith((result) =>
            {
                logger.LogInformation(result.IsCompletedSuccessfully ? "Connected" : "Connected failed");
            });




            return base.StartAsync(cancellationToken);
        }


        public override async Task StopAsync(CancellationToken cancellationToken)
        {
            await connection!.StopAsync(cancellationToken);

            await connection!.DisposeAsync();

            base.StopAsync(cancellationToken);
        }

        //Bir kere çalýþýr.
        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {


            connection!.On<Product>("ReceiveTypeMessageForAllClient", (product) =>
            {
                logger.LogInformation($"Received message: {product.Id}-{product.Name}-{product.Price}");
            });

            return Task.CompletedTask;

            //while (!stoppingToken.IsCancellationRequested)
            //{
            //    if (_logger.IsEnabled(LogLevel.Information))
            //    {
            //        _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            //    }
            //    await Task.Delay(1000, stoppingToken);
            //}
        }


    }
}
