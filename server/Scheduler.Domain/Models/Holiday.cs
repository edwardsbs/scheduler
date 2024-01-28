namespace Scheduler.Domain.Models;

public class Holiday
{
    //public Holiday() { }

    public int HolidayId { get; set; }
    public string HolidayName { get; set;}
    public bool IsPlantObserved { get; set; }
    public string? Note { get; set; }
    public int OrderIndex { get; set; }
    //public ICollection<HolidayDate>? HolidayDates { get; internal set; }
}
