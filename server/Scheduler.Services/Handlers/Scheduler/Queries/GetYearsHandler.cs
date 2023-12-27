using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Scheduler.Models;

namespace Scheduler.Services.Handlers.Scheduler.Queries;

public record GetYearsRequest: IRequest<List<YearViewModel>>;

public class GetYearsHandler : IRequestHandler<GetYearsRequest, List<YearViewModel>>
{
    private readonly ISchedulerContext _context;

    public GetYearsHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<List<YearViewModel>> Handle(GetYearsRequest request, CancellationToken token)
    {
        var years =  await _context.Year.ToListAsync(token);

        var mapper = new Mapper(new MapperConfiguration(cfg => cfg.CreateMap<Year, YearViewModel>()));

        return mapper.Map<List<YearViewModel>>(years);
    }
}
