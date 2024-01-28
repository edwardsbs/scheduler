using AutoMapper;
using Scheduler.Domain.Models;


namespace Scheduler.Services.Handlers.Repositories.Holidays;

/// <summary>
/// Pretending that HolidayDates come from outside database source to 
/// make a repo with interface and utilizing Dapper example
/// </summary>

public class HolidayDateRepoViewModel
{
    public int HolidayDateId { get; set; }
    public string HolidayName { get; set; }
    public DateTime? ObserveDate { get; set; } = null;
    public string? Note { get; set; }
    public int YearId { get; set; }
    public Year Year { get; set; }
    public int? HolidayId { get; set; }
    public Holiday Holiday { get; internal set; }
    public  int Year2 { get; set; }
    public  int OrderIndex { get; set; }

    public void CreateMappings(Profile config)
    {
        config.CreateMap<HolidayDate, HolidayDateRepoViewModel>()
            .ForMember(x => x.Year2, opt =>
                opt.MapFrom(src => src.ObserveDate.Year))
            ;
    }
}
