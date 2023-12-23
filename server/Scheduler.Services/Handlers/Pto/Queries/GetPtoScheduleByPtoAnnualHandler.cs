using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Pto.Models;

namespace Scheduler.Services.Handlers.Pto.Queries;

public record GetPtoScheduleByPtoAnnulRequest(int PtoAnnualId) : IRequest<List<PtoScheduleViewModel>>;

public class GetPtoScheduleByPtoAnnualHandler : IRequestHandler<GetPtoScheduleByPtoAnnulRequest, List<PtoScheduleViewModel>>
{
    private readonly ISchedulerContext _context;

    public GetPtoScheduleByPtoAnnualHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<List<PtoScheduleViewModel>> Handle(GetPtoScheduleByPtoAnnulRequest request, CancellationToken cancellationToken)
    {

        var pto =  await _context.PtoSchedule
            .Include(x => x.PtoAnnual)
            .ThenInclude(pa => pa.Year)
            //.SelectMany(x => x.PtoSchedules)
            .Where(x => x.PtoAnnualId == request.PtoAnnualId)
            .ToListAsync(cancellationToken);

        var config = new MapperConfiguration(cfg => cfg.CreateMap<PtoSchedule, PtoScheduleViewModel>()
            .ForMember(x => x.Year, opt =>
                opt.MapFrom(src => src.PtoAnnual.Year.YearNumber)))
            ;

        var mapper = new Mapper(config);

        var ptoSchedule = mapper.Map<List<PtoScheduleViewModel>>(pto);


        return ptoSchedule;
    }
}
