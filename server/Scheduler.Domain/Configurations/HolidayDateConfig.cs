using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;

namespace Scheduler.Domain.Configurations;

internal class HolidayDateConfig : IEntityTypeConfiguration<HolidayDate>
{
    public void Configure(EntityTypeBuilder<HolidayDate> builder)
    {
        builder.Property(x => x.HolidayDateId).ValueGeneratedOnAdd();
        builder.Property(x => x.ObserveDate).IsRequired();
    }
}
