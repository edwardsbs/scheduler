using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Pto.Schedule.Models;
using Scheduler.Services.Handlers.Repositories.Holidays;

namespace Scheduler.Services.Handlers.Pto.Schedule.Queries;

public record GetPtoScheduleByPtoAnnulRequest(int PtoAnnualId) : IRequest<List<PtoScheduleViewModel>>;

public class GetPtoScheduleByPtoAnnualHandler : IRequestHandler<GetPtoScheduleByPtoAnnulRequest, List<PtoScheduleViewModel>>
{
    private readonly ISchedulerContext _context;
    public IHolidaysForYearRepo _holidaysRepo { get; }

    public GetPtoScheduleByPtoAnnualHandler(ISchedulerContext context, IHolidaysForYearRepo holidaysRepo)
    {
        _context = context;
        _holidaysRepo = holidaysRepo;
    }


    public async Task<List<PtoScheduleViewModel>> Handle(GetPtoScheduleByPtoAnnulRequest request, CancellationToken cancellationToken)
    {

        //PTO Schedule
        var pto = await _context.PtoSchedule
            .Include(x => x.PtoAnnual)
            .ThenInclude(pa => pa.Year)
            //.SelectMany(x => x.PtoSchedules)
            .Where(x => x.PtoAnnualId == request.PtoAnnualId)
            .ToListAsync(cancellationToken);


        var config = new MapperConfiguration(cfg => cfg.CreateMap<PtoSchedule, PtoScheduleViewModel>()
            .ForMember(x => x.Year, opt =>
                opt.MapFrom(src => src.PtoAnnual.Year.YearNumber))
            .ForMember(x => x.DayOfWeek, opt =>
                opt.MapFrom(src => src.PtoDate.ToString("ddd")))
            );

        var mapper = new Mapper(config);        

        var ptoSchedule = mapper.Map<List<PtoScheduleViewModel>>(pto);

        //Holidays Schedule
        var holidays = await _holidaysRepo.GetHolidaysForYear(ptoSchedule[0].Year, cancellationToken);

        var config2 = new MapperConfiguration(cfg => cfg.CreateMap<HolidayDate, PtoScheduleViewModel>()
           .ForMember(x => x.Year, opt =>
               opt.MapFrom(src => src.ObserveDate.Year))
           .ForMember(x => x.DayOfWeek, opt =>
               opt.MapFrom(src => src.ObserveDate.Year.ToString("ddd")))
           .ForMember(x => x.Reason, opt =>
                opt.MapFrom(src => src.Holiday.HolidayName.ToString()))
           .ForMember(x => x.PtoDate, opt =>
                opt.MapFrom(src => src.ObserveDate))
           .ForMember(x => x.IsHoliday, opt => opt.MapFrom(x => true))
           .ForMember(x => x.HolidayDateId, opt =>
                opt.MapFrom(src => src.HolidayDateId)) //in case I decide to edit from the PTO screen
           );

        var mapper2 = new Mapper(config2);

        var holidaySchedule = mapper2.Map<List<PtoScheduleViewModel>>(holidays);

        //Combine Schedules
        var combinedSchedule = ptoSchedule.Union(holidaySchedule).OrderBy(x=> x.PtoDate).ToList();

        return combinedSchedule;
    }
}
