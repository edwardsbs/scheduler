using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Models;

public class HolidayDate
{
    public int HolidayDateId { get; set; }
    public DateTime ObserveDate { get; set; }
    public int YearId { get; set; }
    public Year Year { get; set; }
    public int? HolidayId { get; set; }
    public Holiday Holiday { get; internal set; }

    public static HolidayDate Create(
        DateTime observeDate,
        int yearId,
        int holidayId
        )
    {
        return new HolidayDate()
        {
            ObserveDate = observeDate,
            YearId = yearId,
            HolidayId = holidayId
        };
    }
}
