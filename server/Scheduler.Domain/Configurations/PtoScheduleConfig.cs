using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;

namespace Scheduler.Domain.Configurations;

internal class PtoScheduleConfig : IEntityTypeConfiguration<PtoSchedule>
{
    public void Configure(EntityTypeBuilder<PtoSchedule> builder)
    {
        builder.Property(x => x.PtoScheduleId).ValueGeneratedOnAdd();
        builder.Property(x => x.PtoDate).IsRequired();
        builder.Property(x => x.PtoAnnualId).IsRequired();
    }
}
