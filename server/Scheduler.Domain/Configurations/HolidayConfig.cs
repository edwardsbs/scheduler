using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Models;

namespace Scheduler.Domain.Configurations;

internal class HolidayConfig : IEntityTypeConfiguration<Holiday>
{
    public void Configure(EntityTypeBuilder<Holiday> builder)
    {
        builder.Property(x => x.HolidayId).ValueGeneratedOnAdd();
        builder.Property(x => x.HolidayName).IsRequired();
        builder.HasData(
            new Holiday { HolidayId = 1, HolidayName = "New Years Day", IsPlantObserved = true, Note = "celebrated on the anniversary date, January 1" },
            new Holiday { HolidayId = 2, HolidayName = "Martin Luther King Jr. Birthday", IsPlantObserved = false, Note = "observed on the third Monday of January" },
            new Holiday { HolidayId = 3, HolidayName = "Presidents Day", IsPlantObserved = false, Note = "observed on the third Monday of each February " },
            new Holiday { HolidayId = 4, HolidayName = "Memorial Day", IsPlantObserved = true, Note = "observed on the last Monday of May" },
            new Holiday { HolidayId = 5, HolidayName = "Independence Day", IsPlantObserved = true, Note = "celebrated on the anniversary date, July 4" },
            new Holiday { HolidayId = 6, HolidayName = "Labor Day", IsPlantObserved = true, Note = "observed on the first Monday of each September " },
            new Holiday { HolidayId = 7, HolidayName = "Veterans Day", IsPlantObserved = true, Note = "celebrated on the anniversary date, November 11" },
            new Holiday { HolidayId = 8, HolidayName = "Indigenous Peoples’ Day", IsPlantObserved = false, Note = "celebrated on the second Monday of each October " },
            new Holiday { HolidayId = 9, HolidayName = "Thanksgiving Day", IsPlantObserved = true, Note = "celebrated on the fourth Thursday of each November" },
            new Holiday { HolidayId = 10, HolidayName = "Thanksgiving Holiday", IsPlantObserved = true, Note = "observed on the day after Thanksgiving" },
            new Holiday { HolidayId = 11, HolidayName = "Christmas Eve", IsPlantObserved = true, Note = "celebrated on the anniversary date, December 24" },
            new Holiday { HolidayId = 12, HolidayName = "Christmas Day", IsPlantObserved = true, Note = "celebrated on the anniversary date, December 25" }
            );
    }
}
