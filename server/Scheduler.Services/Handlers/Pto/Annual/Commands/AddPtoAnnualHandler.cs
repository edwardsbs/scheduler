using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;
using Scheduler.Services.Handlers.Services.YearService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Annual.Commands;
public record AddPtoAnnualRequest(
    int year,
    int ptoHours,
    int carriedOverHours,
    int compTimeHours,
    int purchasedHours,
    int floatingHours
    ): IRequest<PtoAnnual>;

public class AddPtoAnnualHandler : IRequestHandler<AddPtoAnnualRequest, PtoAnnual>
{
    private readonly ISchedulerContext _context;
    private readonly IYearModelForYearService _yearService;
    private readonly IPtoAnnualForYearService _annualService;

    public AddPtoAnnualHandler(ISchedulerContext context, IYearModelForYearService yearService, IPtoAnnualForYearService annualService)
    {
        _context = context;
        _yearService = yearService;
        _annualService = annualService;
    }
    public async Task<PtoAnnual> Handle( AddPtoAnnualRequest request, CancellationToken token) 
    {
        var yr = await _yearService.GetYearModel(request.year, token);
        if (yr == null)
        {
            throw new ArgumentException(@$"Year has not been setup for {request.year}");
        }

        var annual = PtoAnnual.Create(
            request.ptoHours, request.carriedOverHours, request.compTimeHours,
            request.purchasedHours, request.floatingHours,
            yr.YearId);

        await _context.PtoAnnual.AddAsync(annual);

        await _context.SaveChangesAsync();

        var fullAnnualRecord = await _context.PtoAnnual.FirstOrDefaultAsync(x => x.YearId == yr.YearId);

        return fullAnnualRecord;
    }
}
