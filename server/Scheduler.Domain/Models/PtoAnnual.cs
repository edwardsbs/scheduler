using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Models;

public class PtoAnnual
{
    public int PtoAnnualId { get; set; }
    public float PtoHours { get; set; }
    public float CarriedOverHours { get; set; }
    public float PurchasedHours { get; set; }
    public float CompTimeHours { get; set; }
    public float FloatingHours { get; set; }
    public float? PtoDays { get; set; }
    public int YearId { get; set; }
    public Year Year { get; set; }
    //public ICollection<PtoSchedule>? PtoSchedules { get; internal set; }

    public static PtoAnnual Create(
        float ptoHours,
        float carriedOverHours,
        float compTimeHours,
        float purchasedHours,
        float floatingHours,
        int yearId)
    {
        return new PtoAnnual()
        {
            PtoHours = ptoHours,
            CarriedOverHours = carriedOverHours,
            CompTimeHours = compTimeHours,
            PurchasedHours = purchasedHours,
            FloatingHours = floatingHours,
            YearId = yearId
        };
    }
}
