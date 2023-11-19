using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Configurations;

internal class HolidayDateConfig : IEntityTypeConfiguration<HolidayDate>
{
    public void Configure(EntityTypeBuilder<HolidayDate> builder)
    {
        builder.Property(x => x.HolidayDateId).ValueGeneratedOnAdd();
        builder.Property(x => x.ObserveDate).IsRequired();
    }
}
