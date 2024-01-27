using MediatR;
using Scheduler.Services.Handlers.Repositories.Holidays;

namespace Scheduler.Services.Handlers.Pto.Schedule.Queries;

/// <summary>
/// Pretending that HolidayDates come from outside database source to 
/// make a repo with interface and utilizing Dapper example
/// </summary>

public record GetHoldayDatesFromRepoRequest(int yearId) : IRequest<List<HolidayDateRepoViewModel>>;
public class GetHolidayDatesFromRepoHandler : IRequestHandler<GetHoldayDatesFromRepoRequest, List<HolidayDateRepoViewModel>>
{
    private readonly IHolidaysRepo _holidaysRepo;

    public GetHolidayDatesFromRepoHandler(IHolidaysRepo holidaysRepo)
    {
        _holidaysRepo = holidaysRepo;
    }
    public async Task<List<HolidayDateRepoViewModel>> Handle(GetHoldayDatesFromRepoRequest request, CancellationToken token)
    {
        return await _holidaysRepo.GetHolidayDates(request.yearId, token);
    }
}
