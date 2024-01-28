using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Pto.Schedule.Models;
using Scheduler.Services.Handlers.Repositories.Holidays;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Schedule.Queries;

public record GetPtoScheduleForYearRequest(int Year) : IRequest<List<PtoScheduleViewModel>>;

public class GetPtoScheduleForYearHandler : IRequestHandler<GetPtoScheduleForYearRequest, List<PtoScheduleViewModel>>
{
    private readonly ISchedulerContext _context;
    public IHolidaysForYearRepo _holidaysRepo { get; }

    public GetPtoScheduleForYearHandler(ISchedulerContext context, IHolidaysForYearRepo holidaysRepo)
    {
        _context = context;
        _holidaysRepo = holidaysRepo;
    }


    public async Task<List<PtoScheduleViewModel>> Handle(GetPtoScheduleForYearRequest request, CancellationToken token)
    {

        //PTO Schedule
        var pto = await _context.PtoSchedule
            .Include(x => x.PtoAnnual)
            .ThenInclude(pa => pa.Year)
            .Where(x => x.PtoAnnual.Year.YearNumber == request.Year)
            .ToListAsync(token);

        var config = new MapperConfiguration(cfg => cfg.CreateMap<PtoSchedule, PtoScheduleViewModel>()
            .ForMember(x => x.Year, opt =>
                opt.MapFrom(src => src.PtoAnnual.Year.YearNumber))
            .ForMember(x => x.DayOfWeek, opt =>
                opt.MapFrom(src => src.PtoDate.ToString("dddd")))
            );

        var mapper = new Mapper(config);

        var ptoSchedule = mapper.Map<List<PtoScheduleViewModel>>(pto);

        var ptoAnnual = pto.Count > 0 ? pto[0].PtoAnnual : null;

        if (ptoAnnual != null)
        {
            ptoSchedule = GenerateBurndown(ptoSchedule, ptoAnnual);
        }

        //Holidays Schedule
        var holidays = await _holidaysRepo.GetHolidaysForYear(ptoSchedule[0].Year, token);
        holidays = holidays.Where(x => x.ObserveDate != null).ToList();

        var config2 = new MapperConfiguration(cfg => cfg.CreateMap<HolidayDateRepoViewModel, PtoScheduleViewModel>()
           .ForMember(x => x.Year, opt =>
               opt.MapFrom(src => src.ObserveDate.HasValue? ((DateTime)src.ObserveDate).Year : 0))
           .ForMember(x => x.DayOfWeek, opt =>
               opt.MapFrom(src => src.ObserveDate.HasValue ? ((DateTime)src.ObserveDate).ToString("dddd") : ""))
           .ForMember(x => x.Reason, opt =>
                opt.MapFrom(src => src.HolidayName.ToString()))
           .ForMember(x => x.PtoDate, opt =>
                opt.MapFrom(src => src.ObserveDate))
           .ForMember(x => x.IsHoliday, opt => opt.MapFrom(x => true))
           .ForMember(x => x.HolidayDateId, opt =>
                opt.MapFrom(src => src.HolidayDateId)) //in case I decide to edit from the PTO screen
           );

        var mapper2 = new Mapper(config2);

        var holidaySchedule = mapper2.Map<List<PtoScheduleViewModel>>(holidays);

        //Combine Schedules
        var combinedSchedule = ptoSchedule.Union(holidaySchedule).OrderBy(x => x.PtoDate).ToList();

        return combinedSchedule;
    }

    private List<PtoScheduleViewModel> GenerateBurndown(List<PtoScheduleViewModel> ptoSchedule, PtoAnnual ptoAnnual)
    {
        var ptoWorking = ptoSchedule.OrderBy(x => x.PtoDate).ToList();

        var startingPtoHours = (int)ptoAnnual.PtoHours + (int)ptoAnnual.PurchasedHours + (int)ptoAnnual.CarriedOverHours + (int)ptoAnnual.FloatingHours;
        var availablePtoHours = startingPtoHours;

        foreach (var pto in ptoWorking)
        {
            if(pto.IsHoliday==true) continue;

            pto.BurndownHours = availablePtoHours - (int)pto.Hours;

            pto.BurndownDays = (double)(pto.BurndownHours / 8.0);

            availablePtoHours -= (int)pto.Hours;
        }

        return ptoSchedule;
    }

}
