using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Repositories.Holidays;

namespace Scheduler.Services.Handlers.Holidays.Queries;

public record GetHolidaysForYearRequest(int Year) : IRequest<List<HolidayDateRepoViewModel>>;
public class GetHolidaysForYearHandler : IRequestHandler<GetHolidaysForYearRequest, List<HolidayDateRepoViewModel>>
{
    private readonly IHolidaysForYearRepo _repo;

    public GetHolidaysForYearHandler(IHolidaysForYearRepo repo)
    {
        _repo = repo;
    }

    public async Task<List<HolidayDateRepoViewModel>> Handle(GetHolidaysForYearRequest request, CancellationToken token)
    {
        //return await _context.HolidayDate
        //    .Include(x => x.Year)
        //    .Include(x => x.Holiday)
        //    .Where(x => x.Year.YearNumber == request.Year)
        //    .ToListAsync();

        return await _repo.GetHolidaysForYear(request.Year, token);

    }
}
