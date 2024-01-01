using Scheduler.Domain.Models;

namespace Scheduler.Services.Handlers.Services.PtoAnnualForYear;

public class PtoAnnualViewModel
{
    public int PtoAnnualId { get; set; }
    public float PtoHours { get; set; }
    public float CarriedOverHours { get; set; }
    public float PurchasedHours { get; set; }
    public float CompTimeHours { get; set; }
    public float FloatingHours { get; set; }
    public float? PtoDays { get; set; }
    public int YearId { get; set; }
    public int Year { get; set; }
    public int TotalPtoHours { get; set; }

}
