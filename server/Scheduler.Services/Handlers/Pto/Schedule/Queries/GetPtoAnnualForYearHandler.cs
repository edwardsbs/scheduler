using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;

namespace Scheduler.Services.Handlers.Pto.Schedule.Queries;

public record GetPtoAnnualForYearRequest(int Year) : IRequest<PtoAnnualViewModel>;
public class GetPtoAnnualForYearHandler : IRequestHandler<GetPtoAnnualForYearRequest, PtoAnnualViewModel>
{
    private readonly ISchedulerContext _context;
    private readonly IPtoAnnualForYearService _annualService;

    public GetPtoAnnualForYearHandler(ISchedulerContext context, IPtoAnnualForYearService annualService)
    {
        _context = context;
        _annualService = annualService;
    }

    public async Task<PtoAnnualViewModel> Handle(GetPtoAnnualForYearRequest request, CancellationToken token)
    {
        PtoAnnualViewModel ptoAnnual = new PtoAnnualViewModel();

        ptoAnnual = await _annualService.GetPtoAnnual(request.Year, token);

        return ptoAnnual;
    }
}
