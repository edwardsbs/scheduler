using AutoMapper;
using Scheduler.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Models;

public class PtoScheduleViewModel
{
    public int PtoScheduleId { get; set; }
    public DateTime PtoDate { get; set; }
    public string? Reason { get; set; }
    public float Hours { get; set; }
    public bool IsScheduled { get; set; }
    public bool IsTaken { get; set; }
    //public int PtoAnnualId { get; set; }
    //public PtoAnnual? PtoAnnual { get; set; }
    public int Year { get; set; }
    public string? DayOfWeek { get; set; }
    public int BurndownHours { get; set; }
    public double BurndownDays { get; set; }

    //public void CreateMappings(Profile config)
    //{
    //    config.CreateMap<PtoSchedule, PtoScheduleViewModel>()
    //        .ForMember(x => x.Year, opt => 
    //            opt.MapFrom(src => src.PtoAnnual.Year.YearNumber))
    //        .ForMember(x => x.Year2, opt =>
    //            opt.MapFrom(src => PtoDate.Year))
    //        ;
    //}
}


