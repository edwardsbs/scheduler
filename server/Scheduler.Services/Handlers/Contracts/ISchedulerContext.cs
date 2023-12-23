using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Scheduler.Domain;
using Scheduler.Domain.Models;

namespace Scheduler.Services.Handlers.Contracts;

public class ISchedulerContext : SchedulerContext
{
    public ISchedulerContext(DbContextOptions<SchedulerContext> options) : base(options) { }
    public DbSet<Holiday> Holiday { get; set; }
    public DbSet<HolidayDate> HolidayDate { get; set; }
    public DbSet<Year> Year { get; set; }
    public DbSet<PtoAnnual> PtoAnnual { get; set; }
    public DbSet<PtoSchedule> PtoSchedule { get; set; }

    //protected override void OnModelCreating(ModelBuilder modelBuilder)
    //{
    //    //This will singularize all table names
    //    foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
    //    {
    //        entityType.Relational().TableName = entityType.DisplayName();
    //    }
    //}
}
