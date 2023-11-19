using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Models;

public class Year
{
    public int YearId { get; set; }
    public int YearNumber { get; set;}
    //public ICollection<HolidayDate>? HolidayDates { get; set; }
}
