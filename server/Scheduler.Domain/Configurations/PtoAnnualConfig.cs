using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;

namespace Scheduler.Domain.Configurations;

internal class PtoAnnualConfig : IEntityTypeConfiguration<PtoAnnual>
{
    public void Configure(EntityTypeBuilder<PtoAnnual> builder)
    {
        builder.Property(x => x.PtoAnnualId).ValueGeneratedOnAdd();
        builder.Property(x => x.PtoHours).IsRequired();
        builder.Property(x => x.YearId).IsRequired();
    }
}
