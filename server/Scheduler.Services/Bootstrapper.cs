using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Holidays.Queries;
using Scheduler.Services.Handlers.Repositories.Holidays;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;
using Scheduler.Services.Handlers.Pto.Schedule.Commands;
using Scheduler.Services.Handlers.Pto.Schedule.Queries;

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
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(AddPtoHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(EditPtoHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetPtoAnnualForYearHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(GetHolidayDatesFromRepoHandler).Assembly));

        //Repositories
        services.AddTransient<IHolidaysRepo, HolidaysRepo>();
        services.AddTransient<IPtoAnnualForYearService, PtoAnnualForYearService>();


        return services;
    }
}
