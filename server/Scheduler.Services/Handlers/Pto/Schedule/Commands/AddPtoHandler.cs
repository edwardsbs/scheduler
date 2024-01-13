using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Scheduler.Services.Handlers.Pto.Schedule.Commands;

public record NewPtoAdd(
    DateTime ptoDate,
    string reason,
    float hours,
    bool isScheduled,
    bool isTaken
 );

public record AddPtoRequest(List<NewPtoAdd> NewPtos) : IRequest<Unit>;
public class AddPtoHandler : IRequestHandler<AddPtoRequest, Unit>
{
    private readonly ISchedulerContext _context;
    private readonly IPtoAnnualForYearService _annualService;

    public AddPtoHandler(ISchedulerContext context, IPtoAnnualForYearService annualService)
    {
        _context = context;
        _annualService = annualService;
    }

    public async Task<Unit> Handle(AddPtoRequest request, CancellationToken token)
    {
        var annualId = 0;
        var annual = await _annualService.GetPtoAnnual(request.NewPtos[0].ptoDate.Year, token);

        if (annual != null) annualId = annual.PtoAnnualId;
        //TO DO: add a check so if the Year does change, the new annual Id can be retrieved.  This is so a request can be wrapped around the 
        // end of a year and into the new year.

        foreach (var ptoEntry in request.NewPtos) 
        {
            var pto = PtoSchedule.Create(ptoEntry.ptoDate, ptoEntry.reason, ptoEntry.hours, ptoEntry.isScheduled, ptoEntry.isTaken, annualId);

            await _context.AddAsync(pto);        
        }

        await _context.SaveChangesAsync(token);

        return Unit.Value;
    }
}
