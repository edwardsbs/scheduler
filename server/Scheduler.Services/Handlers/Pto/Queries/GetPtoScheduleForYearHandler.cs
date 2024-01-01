using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Pto.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Queries;

public record GetPtoScheduleForYearRequest(int Year) : IRequest<List<PtoScheduleViewModel>>;

public class GetPtoScheduleForYearHandler : IRequestHandler<GetPtoScheduleForYearRequest, List<PtoScheduleViewModel>>
{
    private readonly ISchedulerContext _context;

    public GetPtoScheduleForYearHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<List<PtoScheduleViewModel>> Handle(GetPtoScheduleForYearRequest request, CancellationToken token)
    {

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

        return ptoSchedule;
    }

    private List<PtoScheduleViewModel> GenerateBurndown(List<PtoScheduleViewModel> ptoSchedule, PtoAnnual ptoAnnual)
    {
        var ptoWorking = ptoSchedule.OrderBy(x => x.PtoDate).ToList();

        var startingPtoHours = (int)ptoAnnual.PtoHours + (int)ptoAnnual.PurchasedHours + (int)ptoAnnual.CarriedOverHours + (int)ptoAnnual.FloatingHours;
        var availablePtoHours = startingPtoHours;

        foreach (var pto in ptoWorking)
        {
            pto.BurndownHours = (availablePtoHours - (int)pto.Hours);

            pto.BurndownDays = (double)(pto.BurndownHours / 8.0);

            availablePtoHours -= (int)pto.Hours;
        }

        return ptoSchedule;
    }

}
