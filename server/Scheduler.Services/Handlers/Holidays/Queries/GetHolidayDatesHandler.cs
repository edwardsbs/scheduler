using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;

namespace Scheduler.Services.Handlers.Holidays.Queries;

public record GetHolidayDatesRequest : IRequest<List<HolidayDate>>;
public class GetHolidayDatesHandler : IRequestHandler<GetHolidayDatesRequest, List<HolidayDate>>
{
    private readonly ISchedulerContext _context;

    public GetHolidayDatesHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<List<HolidayDate>> Handle(GetHolidayDatesRequest request, CancellationToken token)
    {
        return await _context.HolidayDate
            .Include(hd => hd.Holiday)
            .Include(hd => hd.Year)
            .ToListAsync();
    }
}
