using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Configurations;

internal class YearConfig : IEntityTypeConfiguration<Year>
{
    public void Configure(EntityTypeBuilder<Year> builder)
    {
        builder.Property(x => x.YearId).ValueGeneratedOnAdd();
        builder.Property(x => x.YearNumber).IsRequired();
        builder.HasData(
            new Year { YearId = 1, YearNumber =  2022 },
            new Year { YearId = 2, YearNumber =  2023 },
            new Year { YearId = 3, YearNumber =  2024 },
            new Year { YearId = 4, YearNumber =  2025 }
            );
    }
}
