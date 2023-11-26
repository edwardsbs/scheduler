using Microsoft.EntityFrameworkCore;
using Scheduler.Domain;
using Scheduler.Services;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Holidays.Queries;
using System.Reflection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();

builder.Services.AddSchedulerApps(configuration);

builder.Services.AddControllers()
    .AddJsonOptions(opt =>
        {
            opt.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            opt.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
        }
    );
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opts => {
    //opts.AddPolicy("AllowAngularOrigins");
    opts.AddDefaultPolicy(policy =>
    {
        var origins = configuration["AllowedOrigins"].Split(",").ToList();
        policy
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin()
        .WithOrigins(origins.ToArray())
        .WithOrigins("http://localhost:4200");
    });
    }
);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
