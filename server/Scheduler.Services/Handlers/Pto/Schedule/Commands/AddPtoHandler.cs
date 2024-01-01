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

public record AddPtoRequest(
        DateTime ptoDate,
        string reason,
        float hours,
        bool isScheduled,
        bool isTaken
    ) : IRequest<Unit>;
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
        var annual = await _annualService.GetPtoAnnual(request.ptoDate.Year, token);

        if (annual != null) annualId = annual.PtoAnnualId;

        var pto = PtoSchedule.Create(request.ptoDate, request.reason, request.hours, request.isScheduled, request.isTaken, annualId);

        await _context.AddAsync(pto);

        await _context.SaveChangesAsync(token);

        return Unit.Value;
    }
}
