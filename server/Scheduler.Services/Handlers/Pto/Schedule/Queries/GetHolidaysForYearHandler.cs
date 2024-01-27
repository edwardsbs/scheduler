using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Schedule.Queries;

public record GetHolidaysForYearRequest(int Year) : IRequest<List<HolidayDate>>;
public  class GetHolidaysForYearHandler : IRequestHandler<GetHolidaysForYearRequest, List<HolidayDate>>
{
    private readonly ISchedulerContext _context;

    public GetHolidaysForYearHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<List<HolidayDate>> Handle(GetHolidaysForYearRequest request, CancellationToken token)
    {
        return await _context.HolidayDate
            .Include(x => x.Year)
            .Include(x => x.Holiday)
            .Where(x => x.Year.YearNumber == request.Year)
            .ToListAsync();
    }
}
