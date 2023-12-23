using MediatR;
using Scheduler.Services.Handlers.Repositories.Holidays;

namespace Scheduler.Services.Handlers.Pto.Queries;

/// <summary>
/// Pretending that HolidayDates come from outside database source to 
/// make a repo with interface and utilizing Dapper example
/// </summary>

public record GetHoldayDatesFromRepoRequest(int yearId) : IRequest<List<HoldayDateRepoViewModel>>;
public class GetHolidayDatesFromRepoHandler : IRequestHandler<GetHoldayDatesFromRepoRequest, List<HoldayDateRepoViewModel>>
{
    private readonly IHolidaysRepo _holidaysRepo;

    public GetHolidayDatesFromRepoHandler(IHolidaysRepo holidaysRepo)
    {
        _holidaysRepo = holidaysRepo;
    }
    public async Task<List<HoldayDateRepoViewModel>> Handle(GetHoldayDatesFromRepoRequest request, CancellationToken token)
    {
        return await _holidaysRepo.GetHolidayDates(request.yearId, token);
    }
}
