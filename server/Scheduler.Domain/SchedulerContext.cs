using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Reflection;

namespace Scheduler.Domain;

public class SchedulerContext : DbContext
{
    const string schema = "scheduler";

    //public DbSet<Holiday> Holidays { get; set; }

    public SchedulerContext(DbContextOptions<SchedulerContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema(schema);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(SchedulerContext)));

        //foreach (IMutableEntityType entityType in modelBuilder.Model.GetEntityTypes())
        //{
        //    entityType.Relational().TableName = entityType.DisplayName();
        //}

    }
}