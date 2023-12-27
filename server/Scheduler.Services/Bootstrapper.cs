using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Holidays.Queries;
using Scheduler.Services.Handlers.Pto.Queries;
using Scheduler.Services.Handlers.Repositories.Holidays;

namespace Scheduler.Services;

public static class Bootstrapper
{
    public static IServiceCollection AddSchedulerApps(this IServiceCollection services, IConfiguration config)
    {
        //Pipeline Behaviors


        //Entity Framework
        services.AddDbContext<SchedulerContext>(
            builder => builder.UseSqlServer(config["ConnectionString:SchedulerDB"],
                    x => x.MigrationsAssembly(typeof(SchedulerContext).Assembly.FullName))
                .EnableSensitiveDataLogging());

        services.AddTransient<ISchedulerContext>();

        //Mediator
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetHolidaysListHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetHolidayDatesHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetPtoScheduleByPtoAnnualHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetPtoScheduleForYearHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetHolidayDatesFromRepoHandler).Assembly));

        //Repositories
        services.AddTransient<IHolidaysRepo, HolidaysRepo>();



        return services;
    }
}
