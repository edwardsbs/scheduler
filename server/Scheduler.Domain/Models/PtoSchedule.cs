using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Domain.Models;

public class PtoSchedule
{
    public int PtoScheduleId { get; set; }
    public DateTime PtoDate { get; set; }
    public string? Reason { get; set; }
    public float Hours { get; set; }
    public bool IsScheduled { get; set; }
    public bool IsTaken { get; set; }
    public int PtoAnnualId { get; set; }
    public PtoAnnual? PtoAnnual { get; internal set; }

}
