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

    public static PtoSchedule Create(
            DateTime ptoDate,
            string reason,
            float hours,
            bool isScheduled,
            bool isTaken,
            int ptoAnnualId) 
    {
        return new PtoSchedule()
        {
            PtoDate = ptoDate,
            Reason = reason,
            Hours = hours,
            IsScheduled = isScheduled,
            IsTaken = isTaken,
            PtoAnnualId = ptoAnnualId
        };
    }

}
