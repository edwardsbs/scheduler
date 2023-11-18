using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Scheduler.Domain;

public class SchedulerContext : DbContext
{
    const string schema = "scheduler";

    public SchedulerContext(DbContextOptions<SchedulerContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema(schema);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetAssembly(typeof(SchedulerContext)));
        
    }
}