using MediatR;
using Scheduler.Domain.Models;
using Scheduler.Services.Handlers.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Services.Handlers.Holidays.Commands;

public record EditHolidayDateRequest(
    int HolidayDateId,
    DateTime HolidayDate
    ) : IRequest<Unit>; 

public class EditHolidayDateHandler : IRequestHandler<EditHolidayDateRequest, Unit>
{
    private readonly ISchedulerContext _context;

    public EditHolidayDateHandler(ISchedulerContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(EditHolidayDateRequest request, CancellationToken token)
    {

        var hol = await _context.FindAsync<HolidayDate>(request.HolidayDateId, token);
        
        if (hol != null)
        {
            hol.ObserveDate = request.HolidayDate;

            await _context.SaveChangesAsync();
        }
        else
        {
            throw new ArgumentException("Holiday Entry was not found.");
        }

        return Unit.Value;
    }
}
