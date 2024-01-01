using MediatR;
using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using Scheduler.Services.Handlers.Services.PtoAnnualForYear;
using System;
using System.Collections.Generic;
using System.Formats.Tar;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Pto.Schedule.Commands;

public record EditPtoRequest(
        int ptoScheduleId,
        DateTime ptoDate,
        string reason,
        float hours,
        bool isScheduled,
        bool isTaken
    ) : IRequest<Unit>;
public class EditPtoHandler : IRequestHandler<EditPtoRequest, Unit>
{
    private readonly ISchedulerContext _context;
    private readonly IPtoAnnualForYearService _annualService;

    public EditPtoHandler(ISchedulerContext context, IPtoAnnualForYearService annualService)
    {
        _context = context;
        _annualService = annualService;
    }

    public async Task<Unit> Handle(EditPtoRequest request, CancellationToken token)
    {
        var pto = await _context.FindAsync<PtoSchedule>(request.ptoScheduleId, token);

        if (pto != null)
        {
            var annualId = 0;
            var annual = await _annualService.GetPtoAnnual(request.ptoDate.Year, token);

            if (annual != null) annualId = annual.PtoAnnualId;

            pto.PtoDate = request.ptoDate;
            pto.Reason = request.reason;
            pto.Hours = request.hours;
            pto.IsScheduled = request.isScheduled;
            pto.IsTaken = request.isTaken;
            pto.PtoAnnualId = annualId;

            await _context.SaveChangesAsync(token);

        }
        else
        {
            throw new ArgumentException("PTO Entry was not found.");
        }

        return Unit.Value;
    }
}
