using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;

namespace Scheduler.Services.Handlers.Holidays.Queries;

public record GetHolidaysListRequest : IRequest<List<Holiday>>;

public class GetHolidaysListHandler : IRequestHandler<GetHolidaysListRequest, List<Holiday>>
{
    private readonly ISchedulerContext _context;

    public GetHolidaysListHandler(
        ISchedulerContext context
        )
    {
        _context = context;
    }

    public async Task<List<Holiday>> Handle(GetHolidaysListRequest request, CancellationToken token)
    {
        //var hd = await _context.HolidayDate
        //    .Include(hd => hd.Holiday)
        //    //.ThenInclude(hd => hd.Year)
        //    .ToListAsync();

        return await _context.Holiday
            //.Include(h => h.HolidayDates)
            //.ThenInclude(hd => hd.Year)
            .ToListAsync();

        //return await _context.Set<Holiday>().ToListAsync();
    }

}
